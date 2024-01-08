import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { IKImage } from 'imagekitio-react';
import "../styles/Movie.css";
import { Button } from "../components/Button.js";
import convertJson from "../utility/JsonConverter";
import MyMoviesAPI from '../api/MyMoviesAPI.js';
import axiosOwn from "../api/axios.js";
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

/**
 * Movie component. Specifically used to create a Link to MovieDetails page & image element of the movie.
 * @param movie data of the movie that was sent to this component.
 * @param databaseData boolean value that tells if the data of the movie is from database(true) or from the TMDB API(false).
 * @returns {JSX.Element} Link element with img element inside of it.
 * @constructor Creates the Movie component with the given movie and databaseData value.
 */
const Movie = ({ movie, databaseData }) => {
    const [watched, setWatched] = useState(false); // Determines if the movie is on the users database.
    const [addMovieButtonText, setAddMovieButtonText] = useState("Add to My Movies");


    const addMovie = async () => {
        setAddMovieButtonText("Adding...");
        await fetchMovieDetails().then(async res => {
            const movieData = res.movieData;
            const trailer = res.trailerKey;

            if (movieData != null) {
                const dataToAPI = {
                    title: movieData.title,
                    overview: movieData.overview,
                    posterPath: movieData.poster_path,
                    runtime: movieData.runtime,
                    trailerId: trailer,
                    tmdbId: movieData.id.toString(),
                    date: movieData.release_date,
                    genres: convertJson(movieData.genres)
                };

                await axiosOwn.post(
                    MyMoviesAPI.addNewMovieForUserURL(sessionStorage.getItem("id")),
                    dataToAPI,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                ).then(res => {
                    if (res.status === 200) {
                        setWatched(true);
                        fetchMyMovies();
                        setAddMovieButtonText("Added");
                    }
                }).catch(e => {
                    console.log("Error: " + e);
                })

            } else {
                console.log("Movie data was not valid!")
            }
        })
    }

    const fetchMovieDetails = async () => {
        try {
            const [videosResponse, movieResponse] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`),
                axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`)
            ]);

            const videosData = videosResponse.data.results;
            const trailerKey = videosData.find(data => data.name.toUpperCase().includes("TRAILER"))?.key || '';

            const movieData = movieResponse.data;

            const data = {
                trailerKey: trailerKey,
                movieData: movieData
            }
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    // Gets all the users movies and updates the savedUserMovies array.
    const fetchMyMovies = async () => {
        await axiosOwn.get(MyMoviesAPI.getMyMoviesURL(sessionStorage.getItem("id"))).then(res => {
            sessionStorage.setItem("userMovies", JSON.stringify(res.data));
        })
    }

    // Goes through all the movies from the database and if the movie given to this Movie element is in there, sets the state of watched to true.
    useEffect(() => {
        if (sessionStorage.getItem("userMovies")) {
            const isMovieWatched = JSON.parse(sessionStorage.getItem("userMovies")).some(m => (m.title === movie.title && m.id === movie.id) || (m.title === movie.title && m.tmdbId === movie.id.toString()));
            setWatched(isMovieWatched);
        }
    })

    // Goes through all the movies from the database and if the movie given to this Movie element is in there, sets the state of watched to true.
    useEffect(() => {
        if (sessionStorage.getItem("userMovies")) {
            const isMovieWatched = JSON.parse(sessionStorage.getItem("userMovies")).some(m => (m.title === movie.title && m.id === movie.id) || (m.title === movie.title && m.tmdbId === movie.id.toString()));
            setWatched(isMovieWatched);
        }
    }, [sessionStorage.getItem("userMovies")])

    useEffect(() => {
        if (addMovieButtonText === "Added") {
            setWatched(true);
        }
    }, [addMovieButtonText])

    return (
        <>
            {databaseData ? (
                <Link to={`/movies/${movie.tmdbId}`}>{
                    <IKImage
                        className={watched ? "movie-image-seen" : "movie-image"}
                        urlEndpoint='https://ik.imagekit.io/mymovies'
                        path={`${movie.posterPath}`}
                        transformation={[{
                            height: 450,
                            quality: 70
                        }]}
                        alt={movie.title}
                        lqip={{ active: true }}
                    />
                }</Link>
            ) : (
                <div className='movie-container'>
                    <Link to={`/movies/${movie.id}`}>{
                        <IKImage
                            className={watched ? "movie-image-seen" : "movie-image"}
                            urlEndpoint='https://ik.imagekit.io/mymovies'
                            path={`${movie.posterPath}`}
                            transformation={[{
                                height: 450,
                                quality: 70
                            }]}
                            alt={movie.title}
                            lqip={{ active: true }}
                        />
                    }</Link>
                    {!watched && sessionStorage.getItem("username") ? (
                        <div className="movie-add-button-container"><Button onClick={addMovie} buttonStyle='btn--outline'>{addMovieButtonText}</Button></div>
                    ) : (<></>)}
                </div>
            )}
        </>
    )
}
export default Movie;
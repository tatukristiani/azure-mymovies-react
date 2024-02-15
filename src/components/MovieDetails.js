/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import POSTER_URL from "../api/poster";
import YoutubeVideo from "../utility/YoutubeVideo";
import { Button } from "./Button";
import axiosOwn from "../api/axios";
import convertJson from "../utility/JsonConverter";
import '../styles/MovieDetails.css';
import DateFormatter from "../utility/DateFormatter";
import MyMoviesAPI from '../api/MyMoviesAPI';


const API_KEY = process.env.REACT_APP_API_KEY;

/**
 * Displays details about a movie.
 * @returns {JSX.Element} Elements that contains some information about the movie and a trailer for the movie.
 * @constructor Creates the MovieDetails component.
 */
const MovieDetails = () => {
    const { id } = useParams(); // Id for the movie
    const [movie, setMovie] = useState({});
    const [trailer, setTrailer] = useState(''); // Youtube trailer path.
    const [watched, setWatched] = useState(false);

    // Handles adding the movie to the users database.
    const handleAddMovie = async () => {
        // Confirm that we have actual data to send.
        if (movie != null && movie.title) {
            console.log("MOVIE NOT NULL");
            const dataToAPI = {
                title: movie.title,
                overview: movie.overview,
                posterPath: movie.poster_path,
                runtime: movie.runtime,
                trailerId: trailer,
                tmdbId: movie.id.toString(),
                date: movie.release_date,
                genres: convertJson(movie.genres)
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
                }
            }).catch(e => {
                console.log("Adding movie failed.");
            })

        } else {
            console.log("Movie is not valid!")
        }
    }

    // Handles the removal of the movie from the database.
    const handleRemoveMovie = async () => {
        await axiosOwn.delete(MyMoviesAPI.deleteUserMovieURL(movie.id, sessionStorage.getItem("id"))).then(res => {
            if (res.status === 200) {
                setWatched(false);
                fetchMyMovies();
            }
        })
    }

    // Used to get the trailer.
    useEffect(() => {
        const abortCont = new AbortController();

        const fetchMovieDetails = async () => {
            try {
                const [videosResponse, movieResponse] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`, { signal: abortCont.signal }),
                    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`, { signal: abortCont.signal })
                ]);

                const videosData = videosResponse.data.results;
                const trailerKey = videosData.find(data => data.name.toUpperCase().includes("TRAILER"))?.key || '';
                setTrailer(trailerKey);

                const movieData = movieResponse.data;
                setMovie(movieData);
            } catch (err) {
                console.log("Movie details not found.");
            }
        };

        fetchMovieDetails();

        return () => abortCont.abort();
    }, [id]);


    useEffect(() => {
        if (sessionStorage.getItem("userMovies")) {
            const isMovieWatched = JSON.parse(sessionStorage.getItem("userMovies")).some(m => m.title === movie.title && m.tmdbId === movie.id.toString());
            setWatched(isMovieWatched);
        }
    }, [sessionStorage.getItem("userMovies"), movie]);

    // Gets all the users movies and updates the savedUserMovies array.
    const fetchMyMovies = async () => {
        await axiosOwn.get(MyMoviesAPI.getMyMoviesURL(sessionStorage.getItem("id"))).then(res => {
            sessionStorage.setItem("userMovies", JSON.stringify(res.data));
        })
    }

    return (
        <>
            <div className='movie-info-container'>
                <div className='video-container'>
                    <YoutubeVideo embedId={trailer} />
                </div>
                <div className='movie-detail-container'>
                    <div className='image-container'>
                        <img key={movie.id}
                            className="movie-details-image"
                            src={`${POSTER_URL}${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </div>
                    <div className='movie-details'>
                        <h1>{movie.title}</h1>
                        <p>{movie.overview}</p>
                        <p>Runtime: {movie.runtime} min</p>
                        <p>Release date: {DateFormatter(movie.release_date)}</p>
                        <p>Genres: {movie.genres ? convertJson(movie.genres) : ''}</p>
                        {sessionStorage.getItem("username") && !watched && <Button onClick={handleAddMovie} buttonStyle='btn--details'>Add to My Movies</Button>}
                        {sessionStorage.getItem("username") && watched && <Button onClick={handleRemoveMovie} buttonStyle='btn--details'>Remove</Button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetails;





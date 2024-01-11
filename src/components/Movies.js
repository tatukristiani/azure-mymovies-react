/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Movie from "./Movie";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/Movies.css';
import Paginate from "./Paginate";
import MyMoviesAPI from '../api/MyMoviesAPI';
import axios from '../api/axios';
/**
 * List of movies to be shown at page. This is mostly used all around but works only when searching with genre.
 * Need the code param from the url to get succeeded results.
 * @returns {JSX.Element} Element that has Movie components and  Paginate component for genre selection.
 * @constructor Creates the Movies component.
 */
const Movies = () => {
    const [movies, setMovies] = useState([]);
    const { code } = useParams();
    const { page } = useParams();
    const navigate = useNavigate();

    const handlePageClick = (data) => {
        navigate(`/movies/${code}/${data.selected + 1}`);
        window.scrollTo({ top: 0 });
    }

    const fetchMovies = async () => {
        const url = code === "trending" ? MyMoviesAPI.getTrendingURL(page) : MyMoviesAPI.getGenreURL(code, page);
        await axios.get(url).then(res => {
            console.log(res);
            setMovies(res.data);
        })

    }

    useEffect(() => {
        fetchMovies();
    }, [code, page])

    return (
        <>
            <div>
                <div className="movies-container">
                    {movies.map((movie => (
                        <Movie key={movie.id} movie={movie} databaseData={false} />
                    )))}
                </div>
                <div className='paginate-container'>
                    <Paginate onPageChange={handlePageClick} />
                </div>
            </div>
        </>
    );
};

export default Movies;
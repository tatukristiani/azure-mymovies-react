/* eslint-disable */
import React, { useState, useEffect } from 'react';
import "../styles/Home.css";
import Movie from "./Movie";
import { useParams } from "react-router-dom";
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
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

    const fetchMovies = async () => {
        await axios.get(MyMoviesAPI.getGenreURL(code, currentPage)).then(res => {
            console.log(res);
            setMovies(res.data);
        })
    }
    useEffect(() => {
        fetchMovies();
    }, [currentPage])

    useEffect(() => {
        fetchMovies();
    }, [code])

    return (
        <>
            <div>
                <div className="home-container">
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
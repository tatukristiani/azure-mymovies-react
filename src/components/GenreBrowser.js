import Genres from "../utility/Genres";
import { Link, useParams } from "react-router-dom";
import '../styles/GenreBrowser.css';
import { useEffect, useState } from "react";
import React from 'react';

/**
 * Navigation for selecting movies by genre.
 * @returns {JSX.Element} List of genre texts that will redirect the user to page where the genre leads.
 * @constructor Creates the GenreBrowser element.
 */
const GenreBrowser = () => {
    const [genre, setGenre] = useState(''); // Current genres state
    const { code } = useParams(); // Used from url parameter, change of code means that the user wants to see another movies.

    // Everytime code or genre changes, checks the current genre and sets the genre state accordingly.
    useEffect(() => {
        const checkCurrentGenre = () => {
            switch (code) {
                case Genres.ACTION:
                    setGenre('Action');
                    break;
                case Genres.COMEDY:
                    setGenre('Comedy');
                    break;
                case Genres.ROMANCE:
                    setGenre('Romance');
                    break;
                case Genres.HORROR:
                    setGenre('Horror');
                    break;
                case Genres.DOCS:
                    setGenre('Documentaries');
                    break;
                default:
                    setGenre('Trending');
            }
        }
        checkCurrentGenre();
    }, [code, genre]);

    return (
        <>
            <div className='genre-container'>
                <ul className='genre-list'>
                    <li className='genre-item'>
                        <Link to={`/movies/trending/1`} onClick={() => setGenre('Trending')} className={genre === 'Trending' ? 'genre-link active' : 'genre-link'}>Trending</Link>
                    </li>
                    <li className='genre-item'>
                        <Link to={`/movies/${Genres.ACTION}/1`} onClick={() => setGenre('Action')} className={genre === 'Action' ? 'genre-link active' : 'genre-link'}>Action</Link>
                    </li>
                    <li className='genre-item'>
                        <Link to={`/movies/${Genres.COMEDY}/1`} onClick={() => setGenre('Comedy')} className={genre === 'Comedy' ? 'genre-link active' : 'genre-link'}>Comedy</Link>
                    </li>
                    <li className='genre-item'>
                        <Link to={`/movies/${Genres.HORROR}/1`} onClick={() => setGenre('Horror')} className={genre === 'Horror' ? 'genre-link active' : 'genre-link'}>Horror</Link>
                    </li>
                    <li className='genre-item'>
                        <Link to={`/movies/${Genres.ROMANCE}/1`} onClick={() => setGenre('Romance')} className={genre === 'Romance' ? 'genre-link active' : 'genre-link'}>Romance</Link>
                    </li>
                    <li className='genre-item'>
                        <Link to={`/movies/${Genres.DOCS}/1`} onClick={() => setGenre('Documentaries')} className={genre === 'Documentaries' ? 'genre-link active' : 'genre-link'}>Documentaries</Link>
                    </li>
                </ul>
                <div className='genre-header'>
                    <h1>{genre}</h1>
                </div>
            </div>

        </>
    )
}

export default GenreBrowser;
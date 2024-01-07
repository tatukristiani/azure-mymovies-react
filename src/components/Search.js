import React, { useState } from 'react';
import SearchBar from "./SearchBar";
import Movie from "./Movie";
import axios from "../api/axios";
import '../styles/Search.css';
import MyMoviesAPI from '../api/MyMoviesAPI';

/**
 * Search page which includes the SearchBar component and a container to show the results of the search.
 * @returns {JSX.Element} results of the search request.
 * @constructor Creates the Search component.
 */
const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState('');
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState('');


    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setSearched(false);
        setSearchResults([]);
    }

    // Sends the request to search for a movie with the given input.
    const handleSearch = async (e) => {
        if (e.key === 'Enter' || e.target.tagName.toLowerCase() === 'i') {
            await axios.get(MyMoviesAPI.searchMovieURL(search)).then(res => {
                console.log(res.data);
                if (res.data.length >= 1) {
                    setSearched(true);
                    let resultsArray = res.data.filter(function (movie) {
                        return movie.posterPath
                    });
                    setSearchResults(resultsArray);
                } else {
                    setError(res.data.message);
                }
            })
        }
    }

    return (
        <>
            <SearchBar value={search} onChange={handleSearchChange} handleSearch={(e) => handleSearch(e)} />
            {error && <p className='search-error'>{error}</p>}
            {searched &&
                <p className='search-value'>Search Results Found with '{search}'</p>
            }
            <div className='search-result-container'>
                {searchResults.map((movie => (
                    <Movie key={movie.id} movie={movie} databaseData={false} />
                )))}
            </div>
        </>
    );
};

export default Search;

/* eslint-disable */
import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Movies.css";
import Paginate from "./Paginate";
import MyMoviesAPI from "../api/MyMoviesAPI";
import axios from "../api/axios";
import { GridLoader } from "react-spinners";

/**
 * List of movies to be shown at page. This is mostly used all around but works only when searching with genre.
 * Need the code param from the url to get succeeded results.
 * @returns {JSX.Element} Element that has Movie components and  Paginate component for genre selection.
 * @constructor Creates the Movies component.
 */
const Movies = () => {
  const [loading, setLoading] = useState(false);
  const [moviesLoaded, setMoviesLoaded] = useState(false);
  const [movies, setMovies] = useState([]);
  const { code } = useParams();
  const { page } = useParams();
  const navigate = useNavigate();

  const handlePageClick = (data) => {
    navigate(`/movies/${code}/${data.selected + 1}`);
    window.scrollTo({ top: 0 });
  };

  const fetchMovies = async () => {
    const url =
      code === "trending"
        ? MyMoviesAPI.getTrendingURL(page)
        : MyMoviesAPI.getGenreURL(code, page);
    await axios.get(url).then((res) => {
      setMovies(res.data);
      setMoviesLoaded(true);
    });
  };

  const uniqueId = (prefix = "id-") =>
    prefix + Math.random().toString(16).slice(-4);

  useEffect(() => {
    setLoading(true);
    setMoviesLoaded(false);
    fetchMovies();
  }, [code, page]);

  useEffect(() => {
    if (moviesLoaded) {
      setLoading(false);
    }
  }, [moviesLoaded]);

  return (
    <>
      {loading ? (
        <div className="loader">
          <GridLoader
            color="white"
            loading={true}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div>
          <div className="movies-container">
            {movies.map((movie) => (
              <Movie
                key={uniqueId(movie.id)}
                movie={movie}
                databaseData={false}
              />
            ))}
          </div>
          <div className="paginate-container">
            <Paginate onPageChange={handlePageClick} currentPage={page} />
          </div>
        </div>
      )}
    </>
  );
};

export default Movies;

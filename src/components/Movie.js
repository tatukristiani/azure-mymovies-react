import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { IKImage } from 'imagekitio-react';

/**
 * Movie component. Specifically used to create a Link to MovieDetails page & image element of the movie.
 * @param movie data of the movie that was sent to this component.
 * @param databaseData boolean value that tells if the data of the movie is from database(true) or from the TMDB API(false).
 * @returns {JSX.Element} Link element with img element inside of it.
 * @constructor Creates the Movie component with the given movie and databaseData value.
 */
const Movie = ({ movie, databaseData }) => {
    const [watched, setWatched] = useState(false); // Determines if the movie is on the users database.


    // Goes through all the movies from the database and if the movie given to this Movie element is in there, sets the state of watched to true.
    useEffect(() => {
        if (sessionStorage.getItem("userMovies")) {
            const isMovieWatched = JSON.parse(sessionStorage.getItem("userMovies")).some(m => (m.title == movie.title && m.id == movie.id) || (m.title == movie.title && m.tmdbId == movie.id));
            setWatched(isMovieWatched);
        }
    })

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
            )}
        </>
    )
}
export default Movie;
import React, { useEffect, useState } from 'react';
import Movie from "./Movie";
import convertMinutesToString from "../utility/ConvertMinutesToString";
import '../styles/MyMovies.css';


/**
 *  MyMovies displays users watched movies. Users movies are saved to a UserMoviesContext on login
 * @returns {JSX.Element} elements which contains movies that the user has added to their list.
 * @constructor Creates the MyMovies component.
 */
const MyMovies = () => {
    const [totalTime, setTotalTime] = useState(0); // Total time spent on movies.

    const uniqueId = (prefix = 'id-') => prefix + Math.random().toString(16).slice(-4);

    useEffect(() => {
        if (sessionStorage.getItem("userMovies")) {
            let totalRuntimeCount = 0;
            JSON.parse(sessionStorage.getItem("userMovies")).forEach(movie => {
                totalRuntimeCount += parseInt(movie.runtime);
            })
            setTotalTime(() => totalRuntimeCount);
        }
    }, [])

    return (
        <div className='movies-container'>
            {sessionStorage.getItem("username") ? (
                <>
                    <div className='movie-watched-info-container'>
                        <h1 className='my-movies-header'>{convertMinutesToString(totalTime)}</h1>
                        <h1 className='my-movies-header'>{"Total Movies: "}
                            {
                                sessionStorage.getItem("userMovies") != null ?
                                    (JSON.parse(sessionStorage.getItem("userMovies")).length) : (" 0")
                            }
                        </h1>
                    </div>
                    <div className='my-movies'>
                        {
                            sessionStorage.getItem("userMovies") != null ?
                                (
                                    JSON.parse(sessionStorage.getItem("userMovies")).map((movie => (
                                        <Movie key={uniqueId(movie.id)} movie={movie} databaseData={true} />
                                    )))
                                ) : ("")
                        }
                    </div>
                </>
            ) : (
                <h1 className='my-movies-header'>You must be Signed In to view your movies.</h1>
            )
            }
        </div>
    );
};

export default MyMovies;
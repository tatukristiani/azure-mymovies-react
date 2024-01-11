import React from 'react';
import "../styles/Home.css";
import BG from '../images/movies.png';
import { Button } from './Button';

/**
 * Home page of the site, at the same time it's the "trending" genre.
 * @returns {JSX.Element} Home component with trending movies.
 * @constructor Creates the Home component
 */
const Home = () => {

    return (
        <div className='home-container'>
            <img src={BG} className='home-background' />
            <h1>Welcome to My Movies!</h1>
            <Button to='/movies/trending/1' buttonStyle='btn--outline'>Lets Go</Button>
        </div>
    );
};

export default Home;
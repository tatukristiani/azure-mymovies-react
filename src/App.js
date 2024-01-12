import React from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import MyMovies from "./components/MyMovies";
import Search from "./components/Search";
import Register from "./components/Register";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Movies from "./components/Movies";
import GenreBrowser from "./components/GenreBrowser";
import ForgotPassword from "./components/ForgotPassword";
import ProfilePage from "./components/ProfilePage";

/**
 * Root component of the application.
 * @returns {JSX.Element} The entire website.
 * @constructor Creates the App component.
 */
const App = () => {

  return (
    <Router basename="/">
      <div className="App">
        <Navbar />
        <div className='content'>
          <Routes>
            <Route exact path='/profile' element={<ProfilePage />} />
            <Route exact path='/movies' element={<MyMovies />} />
            <Route exact path='/search' element={<Search />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/forgot-password' element={<ForgotPassword />} />
            <Route exact path='/movies/:id' element={<MovieDetails />} />
            <Route exact path='/movies/:code/:page' element=
              {
                <>
                  <GenreBrowser />
                  <Movies />
                </>
              } />
            <Route path='/' element=
              {
                <Home />
              } />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

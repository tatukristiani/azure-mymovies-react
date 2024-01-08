/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Button } from "./Button";
import '../styles/ProfilePage.css';
import { useNavigate } from "react-router-dom";
import validateEmail from "../utility/ValidateEmail";
import validateCredential from "../utility/ValidateCredentials";
import MyMoviesAPI from '../api/MyMoviesAPI';

// Error messages for invalid username and email.
const USER_ERROR = 'Username must be between 4-20 characters!';
const EMAIL_ERROR = 'Email must be a valid one! i.e. example@gmail.com';

/**
 * Page of the user which contains information about the users movies and the user can modify their username/email from here.
 * @returns {JSX.Element} Elements which contain inputs for username and email and button for update the data or canceling.
 * @constructor Creates the ProfilePage. If there is no logged user there is no way of editing any data.
 */
const ProfilePage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userError, setUserError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [response, setResponse] = useState('');
    const [cancel, setCancel] = useState(false);

    // Fetched the currently logged in users username and email.
    useEffect(() => {
        setEmail(sessionStorage.getItem("email"));
        setUsername(sessionStorage.getItem("username"));
    }, [])

    useEffect(() => {
        if (cancel) {
            navigate("/");
        }
    }, [cancel])


    const cancelUpdate = () => {
        setCancel(true);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        clearErrors();
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        clearErrors();
    }

    // Creates a request that updates the user information.
    const updateUser = async () => {
        // Validate username & email
        let validEmail = validateEmail(email);
        let validUser = validateCredential(username);
        if (validEmail && validUser) {
            const data = {
                id: sessionStorage.getItem("id"),
                username: username,
                email: email
            }
            await axios.put(MyMoviesAPI.updateUserURL(), data, {
                headers: { 'Content-Type': 'application/json' }
            }).then(res => {
                console.log(res);
                if (res.status === 200) {
                    setResponse("Updated successfully!");
                    sessionStorage.setItem("username", res.data.username);
                    sessionStorage.setItem("Email", res.data.email);
                } else {
                    setUserError("Failed to update information.");
                }
            })

        } else if (!validEmail && !validUser) {
            setUserError(USER_ERROR);
            setEmailError(EMAIL_ERROR);
        } else if (validUser) {
            setEmailError(EMAIL_ERROR);
        } else {
            setUserError(USER_ERROR);
        }
    }

    const clearErrors = () => {
        setUserError('');
        setEmailError('');
    }

    return (
        <>
            {sessionStorage.getItem("username") ? (
                <div className='profile-container'>
                    <h1 className='profile-header'>Profile of {sessionStorage.getItem("username")}</h1>
                    <div className='user-information-details'>
                        <label className='profile-label'>Username:</label>
                        <input type='text'
                            className='profile-input'
                            name='username'
                            value={username}
                            autoComplete='off'
                            onChange={handleUsernameChange}
                        />
                        <label className='profile-label-email'>Email:</label>
                        <input type='email'
                            className='profile-input'
                            name='email'
                            value={email}
                            autoComplete='off'
                            onChange={handleEmailChange}
                        />
                        <Button buttonStyle='btn--forgot' onClick={updateUser}>Update Information</Button>
                        <Button buttonStyle='btn--forgot' onClick={cancelUpdate}>Cancel</Button>
                        <br></br>
                        {response && <p className='server-response'>{response}</p>}
                        {userError && <p className='error-message'>{userError}</p>}
                        {emailError && <p className='error-message'>{emailError}</p>}
                    </div>
                </div>
            ) : (
                <div>
                    <h1>You must be logged in to view your profile!</h1>
                </div>
            )
            }
        </>
    )
}

export default ProfilePage;
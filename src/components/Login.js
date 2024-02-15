import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';
import { Link } from "react-router-dom";
import validateCredential from "../utility/ValidateCredentials";
import validatePassword from "../utility/validatePassword";
import MyMoviesAPI from '../api/MyMoviesAPI';
import axios from "../api/axios";
import EncodeToBase64 from '../utility/Encoder';
import { Tooltip } from 'react-tooltip';

const USER_ERROR = "Invalid username format!";
const PASS_ERROR = "Invalid password format!";
/**
 * Login component where user can sing in to the application.
 * @returns {JSX.Element} form type of elements where user can provide username and passwors to login. Also Forgot password link and register link.
 * @constructor Creates the login "form"
 */
const Login = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState(''); // For the input field of username.
    const [pwd, setPwd] = useState(''); // For the input field of password.
    const [errMsg, setErrMsg] = useState(''); // Error mesage for errors.
    const [pending, setPending] = useState(false); // Sets the login buttons text when trying to log in.
    const [login, setLogin] = useState('Sign In'); // The text for the login button, set to different after clicked the login button.
    const [errUser, setErrUser] = useState('');
    const [errPass, setErrorPass] = useState('');

    // Handles the request to the API with the given data.
    // On success send user to home page, on failure displays an error message.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setPending(true);
        const validUsername = validateCredential(user);
        const validPass = validatePassword(pwd);

        // If username and password are valid continue.
        if (validUsername && validPass) {

            await axios.post(MyMoviesAPI.loginUserURL(user, EncodeToBase64(pwd))).then(res => {
                setUser('');
                setPwd('');

                if (res.status === 200) {
                    const request = async () => {
                        sessionStorage.setItem("id", res.data.id);
                        sessionStorage.setItem("email", res.data.email);
                        sessionStorage.setItem("username", res.data.username);

                        await axios.get(MyMoviesAPI.getMyMoviesURL(res.data.id)).then(res => {
                            sessionStorage.setItem("userMovies", JSON.stringify(res.data));
                            navigate("/movies/trending/1");
                        })
                    };
                    request();
                }
            }).catch(err => {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 401) {
                    setErrMsg('Invalid credentials!');
                } else {
                    setErrMsg('Login Failed')
                }
                errRef.current.focus();
                setPending(false);
            });
        } else if (!validUsername && !validPass) { // Both invalid.
            setErrUser(USER_ERROR);
            setErrorPass(PASS_ERROR);
        } else if (validUsername) { // Pass invalid
            setErrorPass(PASS_ERROR);
        } else { // Username invalid
            setErrUser(USER_ERROR);
        }
    }

    // On load focus on username field.
    useEffect(() => {
        userRef.current.focus();
    }, [])


    // Disables error messages when username or password is changed.
    useEffect(() => {
        setErrMsg('');
        setErrUser('');
        setErrorPass('');
    }, [user, pwd])

    // Sets the login buttons text according to pending state.
    useEffect(() => {
        if (pending) {
            setLogin("Signing In...");
        } else {
            setLogin("Sign In");
        }
    }, [pending])

    return (
        <>
            <form autoComplete='off' className='form' onSubmit={handleSubmit}>
                <p ref={errRef} className={errMsg ? "error-message" : "off-screen"}
                    aria-live="assertive">{errMsg}</p>
                <div className='control'>
                    <h1>
                        Sign In
                        {errMsg ? (
                            <>
                                <a
                                    style={{ color: "darkred" }}
                                    data-tooltip-id='tooltip-anchor'
                                    data-tooltip-content="Try again, trust me :)"
                                    data-tooltip-variant='info'
                                    data-tooltip-delay-show="100"
                                    data-tooltip-delay-hide="100"
                                > {"not working (?)"}</a>
                                <Tooltip id="tooltip-anchor" />
                            </>
                        ) : (<></>)
                        }
                    </h1>
                </div>
                <div className='control block-cube block-input'>
                    <input
                        placeholder='Username'
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                    <div className='bg-top'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg-right'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg'>
                        <div className='bg-inner'></div>
                    </div>
                </div>
                <div className="error-div">
                    {errUser && <span className='login-error'>{errUser}</span>}
                </div>
                <div className='control block-cube block-input'>
                    <input placeholder='Password'
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <div className='bg-top'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg-right'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg'>
                        <div className='bg-inner'></div>
                    </div>
                </div>
                <div className="error-div">
                    {errPass && <span className='login-error'>{errPass}</span>}
                </div>
                <button className='btn block-cube block-cube-hover' type='submit' disabled={(pending) ? "disabled" : ""}>
                    <div className='bg-top'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg-right'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='text'>
                        {login}
                    </div>
                </button>
                <Link to='/register' className='nav-links register-link'>
                    Don't have an account? Register here!
                </Link>
                <Link to='/forgot-password' className='nav-links forgot-link'>
                    Forgot Password?
                </Link>
            </form>
        </>
    )
};

export default Login;
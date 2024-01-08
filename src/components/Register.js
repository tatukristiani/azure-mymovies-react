import React, { useEffect, useState, useRef } from 'react';
import axios from '../api/axios';
import '../styles/Login.css';
import '../styles/Register.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import validateEmail from "../utility/ValidateEmail";
import validateCredential from "../utility/ValidateCredentials";
import validatePassword from "../utility/validatePassword";
import MyMoviesAPI from '../api/MyMoviesAPI';
import EncodeToBase64 from "../utility/Encoder";

// Register buttons text
const REGISTER = 'Register';

// Register buttons text when clicked
const CREATING_ACCOUNT = 'Creating Account...';

const EMAIL_ERROR = "Format must be type xxx@yyy.zzz";
const USER_ERROR = "Username can't contain any special characters & length between 4-20!";
const PASS_ERROR = "Password length must be between 4-20!";

/**
 * Register form where user can create and account.
 * @returns {JSX.Element} form element which contain all the needed input fields for user data.
 * @constructor Creates a Register component.
 */
const Register = () => {
    const emailRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [pending, setPending] = useState(false);
    const [register, setRegister] = useState(REGISTER);
    const [success, setSuccess] = useState('');
    const [emailError, setEmailError] = useState('');
    const [userError, setUserError] = useState('');
    const [passError, setPassError] = useState('');
    const [accountCreated, setAccountCreated] = useState(false);


    // Send the request to register a new user.
    // On success redirects to login page.
    // On failure an error message is displayed.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validEmail = validateEmail(email);
        const validUser = validateCredential(user);
        const validPass = validatePassword(pwd);

        if (validEmail && validUser && validPass) {
            setPending(true);

            const account = { username: user, password: EncodeToBase64(pwd), email: email };


            await axios.post(
                MyMoviesAPI.registerURL(),
                account,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        sessionStorage.setItem("username", res.data.username);
                        sessionStorage.setItem("id", res.data.id);
                        sessionStorage.setItem("email", res.data.email);
                        setEmail('');
                        setUser('');
                        setPwd('');
                        setSuccess("Successfully created an account.");
                        setPending(false);
                        setAccountCreated(true);
                    } else {
                        setErrMsg('Sorry..could not create an account :(');
                    }
                }).catch(err => {
                    if (!err?.response) {
                        setErrMsg('No Server Response');
                    } else if (err.response?.status === 400) {
                        setErrMsg(err.response?.data.error);
                    } else {
                        setErrMsg('Register Failed.')
                    }
                    errRef.current.focus();
                })
        } else {
            if (!validEmail) {
                setEmailError(EMAIL_ERROR);
            }
            if (!validUser) {
                setUserError(USER_ERROR);
            }
            if (!validPass) {
                setPassError(PASS_ERROR);
            }
        }
    }

    // On load focus on username field.
    useEffect(() => {
        emailRef.current.focus();
    }, [])


    const disableErrors = () => {
        setErrMsg('');
        setUserError('');
        setPassError('');
        setEmailError('');
    }
    // Disables error messages when username or password is changed.
    useEffect(() => {
        disableErrors();
    }, [user, pwd, email])

    // Sets the Register text on the button to Creating Account for clarity.
    useEffect(() => {
        if (pending) {
            setRegister(CREATING_ACCOUNT)
        } else {
            setRegister(REGISTER)
        }
    }, [pending])

    useEffect(() => {
        if (accountCreated) {
            navigate("/")
        }
    }, [accountCreated])

    return (
        <section>
            <form autoComplete='off' className='form' onSubmit={handleSubmit}>
                <p ref={errRef} className={errMsg ? "error-message" : "off-screen"} aria-live="assertive">{errMsg}</p>
                <div className='control'>
                    <h1>
                        Register
                    </h1>
                </div>
                <div className='control block-cube block-input'>
                    <input
                        placeholder='Enter Email Address'
                        type="email"
                        id="email"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
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
                <div className='error-div'>
                    {emailError && <span className='login-error'>{emailError}</span>}
                </div>
                <div className='control block-cube block-input'>
                    <input
                        placeholder='Enter Username'
                        type="text"
                        id="username"
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
                <div className='error-div'>
                    {userError && <span className='login-error'>{userError}</span>}
                </div>
                <div className='control block-cube block-input'>
                    <input placeholder='Enter Password'
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
                <div className='error-div'>
                    {passError && <span className='login-error'>{passError}</span>}
                </div>
                <button className='btn block-cube block-cube-hover' type='submit'>
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
                        {register}
                    </div>
                </button>
                <Link to='/login' className='nav-links login-link'>
                    Already have an account? Sign In!
                </Link>
                {success && <p className='register-success'>{success}</p>}
            </form>
        </section>
    )
};

export default Register;
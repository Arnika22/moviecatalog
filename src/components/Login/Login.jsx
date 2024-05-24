import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

const Login = () => {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const request = async () => {
        console.log(userData);
        try {
            console.log(userData);
            const response = await axios.post("http://localhost:3000/login", userData);
            console.log(response.data.status);
            if (response.data.status) {
                localStorage.setItem("userData", JSON.stringify(response.data.data[0]));
                window.location.reload();
                navigate("/");
            } else {
                setError(response.data.messages);
                toast.error(response.data.messages);
            }
        } catch (error) {
            // console.log(error);
            setError("An error occurred. Please try again."); // Update error state
        }
    }

    const clickHandler = async (e) => {
        e.preventDefault();
        request();
    }

    const handleRedirect = (e) => {
        e.preventDefault();
        navigate('/signup');
    };

    return (
        <div className={styles.loginpage}>
            <form className={styles.form} onSubmit={clickHandler}>
                <div>
                    <label htmlFor="email">Email</label> {/* Changed 'email' to 'Email' */}
                    <input
                        id="email"
                        type='text'
                        name='email'
                        placeholder='Enter Email'
                        required
                        aria-label="Enter email"
                        onChange={inputHandler}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label> {/* Changed 'password' to 'Password' */}
                    <input
                        id="password"
                        type='password'
                        name='password'
                        placeholder='Enter Password'
                        required
                        aria-label="Enter password"
                        onChange={inputHandler}
                    />
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.buttonGroup}>
                    <button type="button" className={styles.signupButton} onClick={handleRedirect}>Signup</button>
                    <button type="submit" className={styles.loginButton}>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/action";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../../styles/LoginSignup/Login.css'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authError = useSelector((state) => state.auth.error);

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(credentials, navigate));
    };

    return (
        <div className="ln-login-container">
            <h2 className="ln-login-title">Login</h2>
            {authError && <p className="ln-error">{authError}</p>}
            <form onSubmit={handleSubmit} className="ln-login-form">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                    className="ln-input"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    className="ln-input"
                />
                <button type="submit" className="ln-login-button">Login</button>
            </form>
            <p className="ln-signup-text">
                New user? <Link to="/signup" className="ln-signup-link">Sign up here</Link>
            </p>
        </div>
    );
};

export default Login;

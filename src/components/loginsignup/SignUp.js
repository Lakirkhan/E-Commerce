import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../../styles/LoginSignup/Signup.css'

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userData.name || !userData.email || !userData.password) {
            toast.error("All fields are required!");
            return;
        }

        dispatch(signupUser(userData));
        navigate("/login");
    };

    return (
        <div className="sn-signup-container">
            <h2 className="sn-signup-title">Signup</h2>
            <form onSubmit={handleSubmit} className="sn-signup-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={userData.name}
                    onChange={handleChange}
                    required
                    className="sn-input"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                    className="sn-input"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                    className="sn-input"
                />
                <button type="submit" className="sn-signup-button">Signup</button>
            </form>
        </div>
    );
};

export default Signup;

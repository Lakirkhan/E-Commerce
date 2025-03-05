import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/Popup/HeaderPopup.css";

const HeaderPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    // Ensure correct user check from Redux
    const user = useSelector((state) => state.auth?.user);

    useEffect(() => {
        // Show popup only if the user is not logged in
        if (!user) {
            const timer = setTimeout(() => {
                setShowPopup(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [user]);

    // Close popup when clicking outside
    const handleOutsideClick = (e) => {
        if (e.target.classList.contains("header-popup-overlay")) {
            setShowPopup(false);
        }
    };

    // Close popup and navigate when clicking login/signup
    const handleNavigation = (path) => {
        setShowPopup(false);
        navigate(path);
    };

    // If user is logged in, do not render the popup
    if (user) return null;

    return (
        <>
            {showPopup && (
                <div className="header-popup-overlay" onClick={handleOutsideClick}>
                    <div className="header-popup-content">
                        <h2>Welcome! 👋</h2>
                        <p>Log in or sign up to enjoy personalized shopping, faster checkouts, and exclusive deals.</p>
                        <div className="header-popup-buttons">
                            <button className="header-login-btn" onClick={() => handleNavigation("/login")}>
                                Log In
                            </button>
                            <button className="header-signup-btn" onClick={() => handleNavigation("/signup")}>
                                Sign Up
                            </button>
                        </div>
                        <button className="header-close-btn" onClick={() => setShowPopup(false)}>✖</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default HeaderPopup;

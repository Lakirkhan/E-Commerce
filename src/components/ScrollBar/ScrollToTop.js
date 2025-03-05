import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../../styles/ScrollToTop/ScrollToTop.css";

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            className={`scroll-to-top ${visible ? "show" : "hide"}`}
            onClick={scrollToTop}
        >
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTop;

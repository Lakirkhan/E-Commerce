import React, { useEffect, useRef } from "react";
import "./BrandLogos.css";

const BrandLogos = () => {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        const marqueeContent = marquee.querySelector(".marquee-content");

        const animateMarquee = () => {
            const scrollWidth = marqueeContent.scrollWidth;
            const containerWidth = marquee.offsetWidth;

            if (marqueeContent.scrollLeft >= scrollWidth - containerWidth) {
                marqueeContent.scrollLeft = 0;
            } else {
                marqueeContent.scrollLeft += 2;
            }
        };

        const interval = setInterval(animateMarquee, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="brands-logo-container-wrapper">
            <div className="marquee" ref={marqueeRef}>
                <ul className="marquee-content">
                    <li><img src="https://www.dronahq.com/wp-content/uploads/2024/08/Clevertap.svg" alt="Brand logo" /></li>
                    <li><img src="https://www.dronahq.com/wp-content/uploads/2024/08/endy-1.svg" alt="Brand logo" /></li>
                    <li><img src="https://www.dronahq.com/wp-content/uploads/2024/08/Fourier.svg" alt="Brand logo" /></li>
                    <li><img src="https://www.dronahq.com/wp-content/uploads/2024/08/Lenden.svg" alt="Brand logo" /></li>
                    <li><img src="https://www.dronahq.com/wp-content/uploads/2024/08/purple.svg" alt="Brand logo" /></li>
                    <li><img src="https://www.dronahq.com/wp-content/uploads/2024/08/selkirk.svg" alt="Brand logo" /></li>
                    <li><img src="https://www.dronahq.com/wp-content/uploads/2024/08/dolly.svg" alt="Brand logo" /></li>
                    <li><img src="https://www.dronahq.com/wp-content/uploads/2024/08/drata-1.svg" alt="Brand logo" /></li>
                    <li><img src="https://www.dronahq.com/wp-content/uploads/2024/08/media.net_.svg" alt="Brand logo" /></li>
                    <li><img src="https://www.dronahq.com/wp-content/uploads/2024/08/redstamp-1.svg" alt="Brand logo" /></li>
                    <li><img src="https://www.dronahq.com/wp-content/uploads/2024/08/solarjet.svg" alt="Brand logo" /></li>
                </ul>
            </div>
        </div>
    );
};

export default BrandLogos;

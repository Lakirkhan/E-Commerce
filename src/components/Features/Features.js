import React from "react";
import { RotateCcw, Truck, Headphones, CheckCircle } from "lucide-react";
import "../../styles/Features/Features.css";

const Features = () => {
    const features = [
        {
            icon: <RotateCcw size={40} className="animated-icon rotate-icon" />,
            title: "14-Day Returns",
            description: "Risk-free shopping with easy returns.",
            color: "#ff5733", 
        },
        {
            icon: <Truck size={40} className="animated-icon truck-icon" />,
            title: "Free Shipping",
            description: "No extra costs, just the price you see.",
            color: "#3498db",
        },
        {
            icon: <Headphones size={40} className="animated-icon headphone-icon" />,
            title: "24/7 Support",
            description: "24/7 support, always here just for you.",
            color: "#27ae60", 
        },
        {
            icon: <CheckCircle size={40} className="animated-icon check-icon" />,
            title: "Member Discounts",
            description: "Special prices for our loyal customers.",
            color: "#f1c40f", 
        },
    ];

    return (
        <div className="features-container">
            {features.map((feature, index) => (
                <div className="feature-box" key={index}>
                    <div className="feature-icon" style={{ color: feature.color }}>
                        {feature.icon}
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Features;

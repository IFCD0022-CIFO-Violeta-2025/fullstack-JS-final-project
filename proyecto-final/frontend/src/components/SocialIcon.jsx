// src/components/SocialIcon.jsx
import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const SocialIcon = ({ children, onClick = () => { } }) => {
    const { theme, isDarkMode } = useContext(ThemeContext);
    const [hover, setHover] = useState(false);

    // Fondo del botón (color general de tus etiquetas)
    const bgColor = theme.etiquetaColor;

    // Color al hacer hover
    const hoverBg = isDarkMode ? "#ffffff" : "#000000";

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                backgroundColor: hover ? hoverBg : bgColor,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "0.25s ease",
                color: hover ? (isDarkMode ? "#000" : "#fff") : theme.textColor,
                fontSize: "1.4rem",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
        >
            {children}
        </div>
    );
};

export default SocialIcon;
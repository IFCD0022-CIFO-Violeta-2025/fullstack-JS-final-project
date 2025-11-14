import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const Etiqueta = ({ categorias }) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div className="etiquetas-container d-flex flex-wrap justify-content-start">
      {categorias.slice(0, 4).map((cat) => (
        <a
          key={cat}
          onClick={() => navigate(`/categoria/${cat.toLowerCase()}`)}
          className="tag-badge text-decoration-none"
          style={{
            backgroundColor: theme.etiquetaColor,
            color: "#ffffff",
            cursor: "pointer",
            border: "1px solid transparent",
            transition: "all 0.3s ease",
            fontSize: "clamp(0.6rem, 1.2vw, 0.85rem)",
            padding: "0.4rem 1rem",
            marginRight: "0.5rem",
            marginBottom: "0.5rem",
            display: "inline-block",
            position: "relative",
            clipPath: "polygon(10% 0%, 100% 0%, 90% 50%, 100% 100%, 10% 100%, 0% 50%)",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.boton.base.backgroundColor; 
            e.currentTarget.style.color = "#ffffff"; 
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme.etiquetaColor; 
            e.currentTarget.style.color = "#ffffff";
          }}
        >
          #{cat}
        </a>
      ))}
    </div>
  );
};

export default Etiqueta;

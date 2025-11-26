import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const BotonTema = ({ children, onClick = () => {}, type = "button" }) => {
  const { theme } = useContext(ThemeContext);
  const [hovered, setHovered] = useState(false);

  // Los estilos estan en ThemeContext
  const style = hovered
    ? { ...theme.boton.base, ...theme.boton.hover }
    : theme.boton.base;

  return (
    <button
      type={type}
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
};

export default BotonTema; 

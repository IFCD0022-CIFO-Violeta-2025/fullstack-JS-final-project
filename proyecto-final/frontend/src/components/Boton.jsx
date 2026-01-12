import React, { useContext, useState } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

const Boton = ({ children, onClick = () => {}, type = "button", style: customStyle = {} }) => {
  const { theme } = useContext(ThemeContext)
  const [hovered, setHovered] = useState(false)

  // Los estilos estan en ThemeContext
  const themeStyle = hovered ? { ...theme.boton.base, ...theme.boton.hover } : theme.boton.base

  // estilos basicos
  const baseStyle = {
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "inline-block",
  }

  const finalStyle = {
    ...baseStyle,
    ...themeStyle,
    ...customStyle,
  }

  return (
    <button
      type={type}
      style={finalStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  )
}

export default Boton

/*  TODO: cambiar que sea obligatorio el OnClick! */

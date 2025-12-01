import React, { useContext, useState } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

const BotonNavbar = ({ children, onClick = () => {}, type = "button", active = false }) => {
  const { theme } = useContext(ThemeContext)
  const [hovered, setHovered] = useState(false)

  const base = theme.botonNavbar.base
  const hover = theme.botonNavbar.hover

  // Estilos del botón (sin borde ni fondo)
  const buttonStyle = {
    ...(hovered ? { ...base, ...hover } : base),
    border: "none",
    outline: "none",
    background: "transparent",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    backgroundColor: "transparent",
    fontWeight: "500",
    transition: "color 0.3s ease",
    margin: "0 8px",
  }

  // Estilos del texto interno
  const textStyle = {
    display: "inline-block",
    width: "fit-content",
    borderBottom: active ? `2px solid currentColor` : "none", // solo activo
    paddingBottom: active ? "0.2rem" : 0,
    transition: "border-color 0.2s ease",
  }

  return (
    <button
      type={type}
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => e.currentTarget.blur()}
    >
      <span style={textStyle}>{children}</span>
    </button>
  )
}

export default BotonNavbar

/*  TODO: cambiar que sea obligatorio el OnClick! */

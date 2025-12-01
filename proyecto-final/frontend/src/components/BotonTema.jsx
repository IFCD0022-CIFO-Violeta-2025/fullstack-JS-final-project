import React, { useContext, useState } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

const BotonTema = ({ children, onClick = () => {}, type = "button", style: customStyle = {} }) => {
  const { theme } = useContext(ThemeContext)
  const [hovered, setHovered] = useState(false)

  const iconColor = hovered ? theme.botonNavbar.hover.color : theme.botonNavbar.base.color

  const baseStyle = {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "color 0.3s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px"
  }

  const finalStyle = {
    ...baseStyle,
    ...customStyle,
    color: iconColor,
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

export default BotonTema

import React, { useContext, useState } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

const SocialIcon = ({ children, onClick = () => {} }) => {
  const { theme } = useContext(ThemeContext)
  const [hover, setHover] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        /*         backgroundColor: hover ? hoverBg : bgColor, */
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        transition: "0.25s ease",
        color: hover ? theme.etiquetaColor : theme.textColor,
        fontSize: "1.4rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      }}
    >
      {children}
    </div>
  )
}

export default SocialIcon

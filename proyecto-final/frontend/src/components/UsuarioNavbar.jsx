import React, { useContext, useState } from "react"
import { ThemeContext } from "../contexts/ThemeContext"
import { AuthContext } from "../contexts/AuthContext"
import { eventoMock } from "../data/mockData"

function UsuarioNavbar() {
  const { theme } = useContext(ThemeContext)
  const { user, logout } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [hoverName, setHoverName] = useState(false)
  const [hoverLogout, setHoverLogout] = useState(false)

  if (!user) return null // No mostramos nada si no hay usuario

  // Tomamos los datos mockeados para el usuario
  const usuario = {
    nombre: user.name || eventoMock.usuario.nombre,
    avatar: eventoMock.usuario.avatar,
  }

  const nameStyle = {
    color: hoverName ? theme.botonNavbar.hover.color : theme.botonNavbar.base.color,
    transition: "color 0.3s ease",
    fontWeight: "bold",
  }

  return (
    <div className="dropdown" style={{ position: "relative" }}>
      <button
        className="btn d-flex align-items-center"
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: theme.botonNavbar.base.backgroundColor,
          color: theme.botonNavbar.base.color,
          border: theme.botonNavbar.base.border,
        }}
      >
        <img
          src={usuario.avatar}
          alt={usuario.nombre}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "0.5rem",
          }}
        />
        <span
          className="fw-bold"
          style={nameStyle}
          onMouseEnter={() => setHoverName(true)}
          onMouseLeave={() => setHoverName(false)}
        >
          {usuario.nombre}
        </span>
      </button>

      {open && (
        <div
          className="dropdown-menu show"
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            backgroundColor: theme.cardColor,
            color: theme.textColor,
            border: `1px solid ${theme.borderColor}`,
            borderRadius: "0.25rem",
            minWidth: "150px",
            boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15)",
          }}
        >
          <button
            className="dropdown-item fw-bold text-center"
            onClick={logout}
            onMouseEnter={() => setHoverLogout(true)}
            onMouseLeave={() => setHoverLogout(false)}
            style={{
              backgroundColor: "transparent",
              color: hoverLogout ? theme.botonNavbar.hover.color : theme.textColor,
              transition: "color 0.3s ease",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default UsuarioNavbar

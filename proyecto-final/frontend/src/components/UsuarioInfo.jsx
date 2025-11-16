import React, { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

function UsuarioInfo({ usuario }) {
  const { theme } = useContext(ThemeContext)

  return (
    <div className="d-flex align-items-center p-3">
      <img
        src={usuario.avatar}
        alt={usuario.nombre}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          objectFit: "cover",
          marginRight: "1rem",
        }}
      />
      <div>
        <div style={{ fontWeight: "bold" }}>{usuario.nombre}</div>
        <div style={{ fontSize: "0.85rem", color: theme.textColor }}>
          Publicado el{" "}
          {new Date(usuario.fechaPublicacion).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  )
}

export default UsuarioInfo

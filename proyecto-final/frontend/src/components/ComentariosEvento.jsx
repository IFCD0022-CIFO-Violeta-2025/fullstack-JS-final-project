import React, { useContext, useState } from "react"
import { ThemeContext } from "../contexts/ThemeContext"
import Boton from "./Boton"

const ComentariosEvento = ({ comentarios, onAgregarComentario }) => {
  const { theme } = useContext(ThemeContext)
  const [nuevoComentario, setNuevoComentario] = useState("")
  const [likes, setLikes] = useState({}) // 👉 almacenamos likes por índice

  const manejarEnvio = () => {
    if (nuevoComentario.trim() === "") return

    if (onAgregarComentario) {
      onAgregarComentario({
        usuario: "Usuario",
        mensaje: nuevoComentario,
        hora: new Date().toLocaleString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "short",
        }),
        likes: 0,
      })
    }

    setNuevoComentario("")
  }

  const manejarLike = (index) => {
    setLikes((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1,
    }))
  }

  return (
    <>
      <div
        className="card mt-5"
        style={{
          backgroundColor: theme.cardColor,
          color: theme.textColor,
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          overflow: "hidden",
          border: `1px solid ${theme.borderColor}`,
        }}
      >
        {/* --- Título --- */}
        <div
          className="card-header"
          style={{
            fontWeight: "bold",
            fontSize: "1.3rem",
            backgroundColor: theme.etiquetaColor,
            color: theme.white || "#fff",
            padding: "0.75rem 1rem",
            borderBottom: `2px solid ${theme.borderColor}`,
            letterSpacing: "0.5px",
          }}
        >
          💬 Comentarios
        </div>

        {/* --- Lista --- */}
        {comentarios.length === 0 ? (
          <div className="card-body" style={{ fontStyle: "italic", opacity: 0.8 }}>
            No hay comentarios aún.
          </div>
        ) : (
          <ul className="list-group list-group-flush">
            {comentarios.map((c, index) => (
              <li
                key={index}
                className="list-group-item"
                style={{
                  backgroundColor: theme.cardColor,
                  color: theme.textColor,
                  border: "none",
                  borderBottom:
                    index === comentarios.length - 1 ? "none" : `1px solid ${theme.borderColor}`,
                  padding: "0.75rem 1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <strong style={{ color: theme.etiquetaColor }}>{c.usuario}:</strong>{" "}
                    <span>{c.mensaje}</span>
                    <div style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "4px" }}>
                      🕒 {c.hora || "hora desconocida"}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => manejarLike(index)}
                      style={{
                        background: "transparent",
                        border: `1px solid ${theme.borderColor}`,
                        borderRadius: "4px",
                        padding: "2px 6px",
                        cursor: "pointer",
                        color: theme.textColor,
                      }}
                    >
                      👍 {likes[index] || c.likes || 0}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* --- Formulario para comentar --- */}
      <div
        className="p-3 mt-3"
        style={{
          backgroundColor: theme.cardColor,
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          border: `1px solid ${theme.borderColor}`,
        }}
      >
        <label
          style={{
            fontWeight: "bold",
            marginBottom: "8px",
            display: "block",
            color: theme.titleColor,
          }}
        >
          Añadir un comentario
        </label>

        <textarea
          className="form-control"
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
          placeholder="Escribe tu comentario aquí..."
          rows="3"
          style={{
            backgroundColor: theme.dejarComentario,
            color: theme.textColor,
            border: `1px solid ${theme.borderColor}`,
            marginBottom: "1rem",
            borderRadius: "6px",
          }}
        />

        <Boton onClick={manejarEnvio}>Enviar comentario</Boton>
      </div>
    </>
  )
}

export default ComentariosEvento

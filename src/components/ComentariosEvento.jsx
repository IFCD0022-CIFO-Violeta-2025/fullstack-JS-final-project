// ESTA SECCIÓN REQUIERE DE MODIFICACIONES ESTÉTICAS PERO DEBERÍA SER FUNCIONAL.

import React, { useContext, useState, useEffect, useRef } from "react"
import { ThemeContext } from "../contexts/ThemeContext"
import Boton from "./Boton"

// Mock DB inicial
const mockComentariosDB = [
  {
    usuario: "Sandra",
    mensaje: "¡Me encanta este evento!",
    hora: new Date().toLocaleString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    }),
    likes: [], // ahora es array de usuarios que dieron like
  },
  {
    usuario: "Francisco",
    mensaje: "¡Muy interesante!",
    hora: new Date().toLocaleString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    }),
    likes: [],
  },
]

// AQUI ABAJO HAY UNA VARIABLE PLACEHOLDER QUE AL CONECTAR CON LA DB DEBERA SER COMPARADA CON EL USUARIO Y SI ES ADMIN.

const ComentariosEvento = ({ admin = true, user = "EstoEsUnUsuario" }) => {
  const { theme } = useContext(ThemeContext)
  const [comentarios, setComentarios] = useState(mockComentariosDB)
  const [nuevoComentario, setNuevoComentario] = useState("")
  const [editIndex, setEditIndex] = useState(null)
  const [editValue, setEditValue] = useState("")
  const editRef = useRef(null) // para auto-resize

  // Log para ver cambios en comentarios
  useEffect(() => {
    console.log("Comentarios actualizados:", comentarios)
    // Se podría guardar en localStorage o backend aquí
  }, [comentarios])

  // Auto-resize del textarea de edición
  useEffect(() => {
    if (editRef.current) {
      editRef.current.style.height = "auto"
      editRef.current.style.height = editRef.current.scrollHeight + "px"
    }
  }, [editValue, editIndex])

  // Función para enviar un nuevo comentario
  const manejarEnvio = () => {
    if (nuevoComentario.trim() === "") return

    const comentario = {
      usuario: user,
      mensaje: nuevoComentario,
      hora: new Date().toLocaleString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
      }),
      likes: [], // inicial vacío
    }

    setComentarios((prev) => [...prev, comentario])
    setNuevoComentario("")
  }

  // Función para dar like / quitar like
  const manejarLike = (index) => {
    setComentarios((prev) =>
      prev.map((c, i) => {
        if (i !== index) return c
        if (c.likes.includes(user)) {
          return { ...c, likes: c.likes.filter((u) => u !== user) }
        } else {
          return { ...c, likes: [...c.likes, user] }
        }
      })
    )
  }

  // Función para borrar comentario
  const manejarBorrar = (index) => {
    setComentarios((prev) => prev.filter((_, i) => i !== index))
  }

  // Función para activar edición
  const manejarEditar = (index) => {
    setEditIndex(index)
    setEditValue(comentarios[index].mensaje)
  }

  // Función para aplicar cambios en edición
  const aplicarCambios = () => {
    if (editValue.trim() === "") return
    setComentarios((prev) =>
      prev.map((c, i) => (i === editIndex ? { ...c, mensaje: editValue } : c))
    )
    setEditIndex(null)
    setEditValue("")
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
          border: `2px solid ${theme.borderColor}`,
        }}
      >
        {/*  Título  */}
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

        {/*  Lista de comentarios  */}
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
                <div>
                  <div>
                    <strong style={{ color: theme.etiquetaColor }}>{c.usuario}:</strong>{" "}
                    {/*  Edición  */}
                    {editIndex === index ? (
                      <>
                        <textarea
                          ref={editRef}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          style={{
                            width: "100%",
                            fontSize: "1rem",
                            resize: "none",
                            overflow: "hidden",
                            marginTop: "4px",
                          }}
                        />
                        <button
                          onClick={aplicarCambios}
                          style={{
                            marginTop: "4px",
                            cursor: "pointer",
                            backgroundColor: "green",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            padding: "4px 8px",
                          }}
                        >
                          Aplicar cambios
                        </button>
                      </>
                    ) : (
                      // Mensaje mostrado con auto-wrap
                      <div
                        style={{
                          background: "#9569FF",
                          color: theme.white,
                          borderRadius: "6px",
                          padding: "6px",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word", // rompe palabras largas
                        }}
                      >
                        {c.mensaje}
                      </div>
                    )}
                    <div style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "4px" }}>
                      🕒 {c.hora || "hora desconocida"}
                    </div>
                  </div>

                  {/* Botones de like, borrar y editar */}
                  <div style={{ display: "flex", gap: "4px", marginTop: "6px" }}>
                    <button
                      onClick={() => manejarLike(index)}
                      style={{
                        background: "transparent",
                        border: `1px solid ${theme.borderColor}`,
                        borderRadius: "4px",
                        padding: "2px 6px",
                        cursor: "pointer",
                        color: c.likes.includes(user) ? "blue" : theme.textColor,
                      }}
                    >
                      👍 {c.likes.length}
                    </button>

                    {(admin || c.usuario === user) && editIndex !== index && (
                      <>
                        <button
                          onClick={() => manejarBorrar(index)}
                          style={{
                            background: "red",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            padding: "2px 6px",
                            cursor: "pointer",
                          }}
                        >
                          🗑️
                        </button>
                        <button
                          onClick={() => manejarEditar(index)}
                          style={{
                            background: "orange",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            padding: "2px 6px",
                            cursor: "pointer",
                          }}
                        >
                          ✏️
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Formulario para nuevo comentario */}
      <div
        className="p-3 mt-3"
        style={{
          backgroundColor: theme.cardColor,
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          border: `2px solid ${theme.borderColor}`,
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
          onChange={(e) => {
            let valor = e.target.value
            if (valor.length <= 400) {
              const primeraLetraI = valor.search(/[a-zA-Z]/)

              if (primeraLetraI !== -1) {
                valor =
                  valor.slice(0, primeraLetraI) +
                  valor.charAt(primeraLetraI).toUpperCase() +
                  valor.slice(primeraLetraI + 1)
              }
              setNuevoComentario(valor)
              /*  setNuevoComentario(valor.charAt(0).toUpperCase() + valor.slice(1)) */
            }
          }}
          placeholder="Escribe tu comentario aquí..."
          rows="3"
          style={{
            backgroundColor: theme.dejarComentario,
            color: theme.black,
            border: `2px solid ${theme.borderColor}`,
            marginBottom: "1rem",
            borderRadius: "6px",
            resize: "none",
          }}
        />

        <Boton onClick={manejarEnvio}>Enviar comentario</Boton>
      </div>
    </>
  )
}

export default ComentariosEvento

/* 
-V al escribir en modo oscuro no se ven las letras
-V arreglar el campo de texto que no se abra hasta el infinito
-V botones abajo
-V limitar numero de letras en comentario
-V la primera letra en comentarios que sea mayuscula
- ordenar comentarios por fecha
- colores y componetizar
- admin en false
*/

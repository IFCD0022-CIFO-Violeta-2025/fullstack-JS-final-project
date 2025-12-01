import React, { useContext, useState, useEffect, useRef } from "react"
import { ThemeContext } from "../contexts/ThemeContext"
import Boton from "./Boton"
import { BsChatRightFill } from "react-icons/bs"
import { FaRegClock } from "react-icons/fa"
import { AiFillLike } from "react-icons/ai"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { BiSolidPencil } from "react-icons/bi"

// Mock DB inicial con IDs únicos
const mockComentariosDB = [
  {
    id: crypto.randomUUID(),
    usuario: "Sandra",
    mensaje: "¡Me encanta este evento!",
    fecha: new Date("2024-01-01T10:30:00"),
    likes: [],
  },
  {
    id: crypto.randomUUID(),
    usuario: "Francisco",
    mensaje: "¡Muy interesante!",
    fecha: new Date("2024-01-01T09:10:00"),
    likes: [],
  },
]

const ComentariosEvento = ({ admin = true, user = "EstoEsUnUsuario" }) => {
  const { theme } = useContext(ThemeContext)

  const [comentarios, setComentarios] = useState(
    [...mockComentariosDB].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  )

  const [nuevoComentario, setNuevoComentario] = useState("")
  const [editID, setEditID] = useState(null)
  const [editValue, setEditValue] = useState("")
  const editRef = useRef(null)

  useEffect(() => {
    console.log("Comentarios actualizados:", comentarios)
  }, [comentarios])

  // Auto-resize textarea edición
  useEffect(() => {
    if (editRef.current) {
      editRef.current.style.height = "auto"
      editRef.current.style.height = editRef.current.scrollHeight + "px"
    }
  }, [editValue, editID])

  // Enviar comentario
  const manejarEnvio = () => {
    if (nuevoComentario.trim() === "") return

    const comentario = {
      id: crypto.randomUUID(),
      usuario: user,
      mensaje: nuevoComentario,
      fecha: new Date(),
      likes: [],
    }

    // Insertar arriba y reordenar
    setComentarios((prev) =>
      [comentario, ...prev].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    )

    setNuevoComentario("")
  }

  const manejarLike = (id) => {
    setComentarios((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              likes: c.likes.includes(user)
                ? c.likes.filter((u) => u !== user)
                : [...c.likes, user],
            }
          : c
      )
    )
  }

  const manejarBorrar = (id) => {
    setComentarios((prev) => prev.filter((c) => c.id !== id))
  }

  const manejarEditar = (id) => {
    const comentario = comentarios.find((c) => c.id === id)
    if (!comentario) return
    setEditID(id)
    setEditValue(comentario.mensaje)
    // focus del textarea tras setear editID (opcional)
    setTimeout(() => {
      if (editRef.current) editRef.current.focus()
    }, 0)
  }

  const aplicarCambios = () => {
    if (editValue.trim() === "") return

    setComentarios((prev) => prev.map((c) => (c.id === editID ? { ...c, mensaje: editValue } : c)))

    setEditID(null)
    setEditValue("")
  }

  const comentariosOrdenados = [...comentarios].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  )

  return (
    <>
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

      <div
        className="card mt-3"
        style={{
          backgroundColor: theme.cardColor,
          color: theme.textColor,
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          overflow: "hidden",
          border: `2px solid ${theme.borderColor}`,
        }}
      >
        <div
          className="card-header d-flex align-items-center"
          style={{
            fontWeight: "bold",
            fontSize: "1.3rem",
            backgroundColor: theme.up,
            color: theme.white || "#fff",
            padding: "0.75rem 1rem",
            borderBottom: `2px solid ${theme.borderColor}`,
            letterSpacing: "0.5px",
          }}
        >
          <span style={{ marginTop: "-3px", marginRight: "8px" }}>
            <BsChatRightFill />
          </span>{" "}
          <span>Comentarios</span>
        </div>

        {comentarios.length === 0 ? (
          <div className="card-body" style={{ fontStyle: "italic", opacity: 0.8 }}>
            No hay comentarios aún.
          </div>
        ) : (
          <ul className="list-group list-group-flush">
            {comentariosOrdenados.map((c) => (
              <li
                key={c.id}
                className="list-group-item"
                style={{
                  backgroundColor: theme.cardColor,
                  color: theme.textColor,
                  border: "none",
                  borderBottom: `1px solid ${theme.borderColor}`,
                  padding: "0.75rem 1rem",
                }}
              >
                <div>
                  <strong style={{ color: theme.textColor }}>{c.usuario}:</strong>

                  {editID === c.id ? (
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

                      <Boton onClick={aplicarCambios}>Aplicar cambios</Boton>
                    </>
                  ) : (
                    <div
                      style={{
                        background: "#9569FF",
                        color: theme.white,
                        borderRadius: "6px",
                        padding: "6px",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        marginTop: "4px",
                      }}
                    >
                      {c.mensaje}
                    </div>
                  )}

                  <div
                    className="d-flex align-items-center"
                    style={{ fontSize: "0.75rem", opacity: 0.7, marginTop: "6px" }}
                  >
                    <span style={{ marginTop: "-3px", marginRight: "4px" }}>
                      <FaRegClock />
                    </span>
                    <span>
                      {new Date(c.fecha).toLocaleString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: "4px", marginTop: "8px" }}>
                    <Boton
                      style={{
                        fontSize: "16px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        padding: "4px 8px",
                      }}
                      onClick={() => manejarLike(c.id)}
                    >
                      <AiFillLike /> {c.likes.length}
                    </Boton>

                    {(admin || c.usuario === user) && editID !== c.id && (
                      <>
                        <Boton
                          style={{
                            fontSize: "16px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "6px",
                          }}
                          onClick={() => manejarEditar(c.id)}
                        >
                          <BiSolidPencil />
                        </Boton>

                        <Boton
                          style={{
                            fontSize: "16px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "6px",
                          }}
                          onClick={() => manejarBorrar(c.id)}
                        >
                          <RiDeleteBin6Fill />
                        </Boton>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default ComentariosEvento

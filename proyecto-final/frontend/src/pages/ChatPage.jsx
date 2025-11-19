import { useEffect, useState, useContext, useRef } from "react"
import { io } from "socket.io-client"
import { ThemeContext } from "../contexts/ThemeContext"
import { AuthContext } from "../contexts/AuthContext"
import { eventoMock } from "../data/mockData"
import Titulo from "../components/Titulo"
import Boton from "../components/Boton"

const socket = io("http://localhost:3000")

export default function ChatPage() {
  const { theme } = useContext(ThemeContext)
  const { user } = useContext(AuthContext)
  const chatEndRef = useRef(null)

  const usuarioActual = {
    nombre: user?.name || eventoMock.usuario.nombre,
    avatar: eventoMock.usuario.avatar,
  }

  // Mensajes iniciales con un mock de otro usuario
  const [messages, setMessages] = useState([
    {
      user: "Diego",
      content: "¡Hola! Bienvenidos al chat del evento.",
      timestamp: "18:45",
      avatar: eventoMock.usuario.avatar,
    },
  ])

  const [message, setMessage] = useState("")

  // Escuchar mensajes entrantes
  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg])
    })
    return () => socket.off("chat message")
  }, [])

  // Scroll automático al final
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (!message.trim()) return

    const newMsg = {
      user: usuarioActual.nombre,
      content: message,
      timestamp: new Date().toLocaleTimeString(),
      avatar: usuarioActual.avatar,
    }
    socket.emit("chat message", newMsg)
    setMessage("") // solo limpiar el input, no agregar al estado
  }

  // Componente para un mensaje individual
  const Mensaje = ({ m }) => {
    const isMe = m.user === usuarioActual.nombre
    return (
      <li className={`mb-2 d-flex ${isMe ? "justify-content-end" : "justify-content-start"}`}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
          {/* Avatar a la izquierda si no es mensaje propio */}
          {!isMe && (
            <img
              src={m.avatar}
              alt={m.user}
              style={{
                width: "45px",
                height: "45px",
                margin: "0 6px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}

          {/* Burbuja del mensaje con estilos fijos */}
          <div
            style={{
              background: "red", // color fijo
              borderRadius: "8px",
              padding: "4px 10px",
              position: "relative",
              maxWidth: "calc(100% - 55px)", // respeta espacio para avatar
              wordBreak: "break-word",
            }}
          >
            {/* Triángulo */}
            <div
              style={{
                position: "absolute",
                top: "8px",
                left: isMe ? "auto" : "-8px",
                right: isMe ? "-8px" : "auto",
                width: 0,
                height: 0,
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                borderLeft: isMe ? "8px solid red" : "none",
                borderRight: isMe ? "none" : "8px solid red",
              }}
            />
            <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>{m.user}</div>
            <div>{m.content}</div>
            <div style={{ fontSize: "0.75rem", opacity: 0.7, marginTop: "2px" }}>
              🕒 {m.timestamp}
            </div>
          </div>

          {/* Avatar a la derecha si es mensaje propio */}
          {isMe && (
            <img
              src={m.avatar}
              alt={m.user}
              style={{
                width: "45px",
                height: "45px",
                margin: "0 6px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
        </div>
      </li>
    )
  }

  return (
    <>
      <Titulo title="Chat del Evento" />

      <div className="mx-auto mt-4" style={{ maxWidth: "600px", width: "100%" }}>
        <div
          className="card"
          style={{
            backgroundColor: theme.cardColor,
            color: theme.textColor,
            border: `1px solid ${theme.borderColor}`,
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <div
            className="card-header"
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              backgroundColor: theme.etiquetaColor,
              color: theme.white || "#fff",
              borderBottom: `2px solid ${theme.borderColor}`,
            }}
          >
            💬 Chat
          </div>

          <div
            className="card-body d-flex flex-column"
            style={{
              height: "400px",
              overflowY: "auto",
              padding: "1rem",
            }}
          >
            {messages.length === 0 && (
              <div style={{ fontStyle: "italic", opacity: 0.7 }}>No hay mensajes aún.</div>
            )}

            <ul className="list-unstyled flex-grow-1 mb-0">
              {messages.map((m, i) => (
                <Mensaje key={i} m={m} />
              ))}
              <div ref={chatEndRef} />
            </ul>
          </div>

          <div
            className="card-footer d-flex gap-2 align-items-center"
            style={{ backgroundColor: theme.cardColor }}
          >
            <textarea
              className="form-control"
              placeholder="Escribe tu mensaje..."
              value={message}
              onChange={(e) => {
                if (e.target.value.length <= 250) setMessage(e.target.value)
              }}
              rows={2}
              style={{
                resize: "none",
                border: `1px solid ${theme.borderColor}`,
                borderRadius: "6px",
                backgroundColor: theme.dejarComentario,
                color: theme.black,
                flexGrow: 1,
              }}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())
              }
            />
            <Boton onClick={sendMessage}>Enviar</Boton>
          </div>
        </div>
      </div>
    </>
  )
}

import { useEffect, useState, useContext } from "react"
import { io } from "socket.io-client"
import { ThemeContext } from "../contexts/ThemeContext"
import { AuthContext } from "../contexts/AuthContext"
import { eventoMock } from "../data/mockData"
import Titulo from "../components/Titulo"

const socket = io("http://localhost:3000")

export default function ChatPage() {
  const { theme } = useContext(ThemeContext)
  const { user } = useContext(AuthContext)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")

  // 🔹 Nombre y avatar del usuario actual
  const usuarioActual = {
    nombre: user?.name || eventoMock.usuario.nombre,
    avatar: eventoMock.usuario.avatar,
  }

  useEffect(() => {
    socket.on("chat message", (msg) => {
      // msg ahora es un objeto { user, content, timestamp, avatar }
      setMessages((prev) => [...prev, msg])
    })

    return () => socket.off("chat message")
  }, [])

  const sendMessage = () => {
    if (message.trim()) {
      const newMsg = {
        user: usuarioActual.nombre,
        content: message,
        timestamp: new Date().toLocaleTimeString(),
        avatar: usuarioActual.avatar, // incluimos avatar
      }
      socket.emit("chat message", newMsg)
      /* setMessages((prev) => [...prev, newMsg]) */ // ya lo recibiremos por socket
      setMessage("")
    }
  }

  return (
  <>
    <Titulo title="Chat del Evento" />

    {/* Contenedor centrado con ancho máximo */}
    <div
      className="mx-auto"
      style={{
        maxWidth: "600px", // 🔹 ajusta el ancho máximo del chat
        width: "100%",     // 🔹 ocupa todo el ancho disponible hasta el máximo
        marginTop: "2rem",
      }}
    >
      {/* Chat box */}
      <div
        className="border rounded p-3 d-flex flex-column"
        style={{
          height: "400px",
          backgroundColor: theme.cardColor,
          overflowY: "auto",
          border: `1px solid ${theme.borderColor}`,
        }}
      >
        <ul className="list-unstyled flex-grow-1 mb-3">
          {messages.map((m, i) => (
            <li
              key={i}
              className={`p-2 mb-2 rounded ${m.user === usuarioActual.nombre ? "text-end" : "text-start"}`}
              style={{
                backgroundColor:
                  m.user === usuarioActual.nombre ? theme.purpleLight : theme.lightSecondary,
                color: theme.textColor,
                maxWidth: "70%",
                alignSelf: m.user === usuarioActual.nombre ? "flex-end" : "flex-start",
                display: "flex",
                gap: "8px",
                alignItems: "flex-start",
              }}
            >
              {/* Avatar */}
              <img
                src={m.avatar}
                alt={m.user}
                style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }}
              />

              {/* Contenido del mensaje */}
              <div>
                <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>{m.user}</div>
                <div>{m.content}</div>
                <div style={{ fontSize: "0.75rem", opacity: 0.7, marginTop: "2px" }}>
                  🕒 {m.timestamp} 
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Input + button */}
        <div className="d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Escribe un mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            style={{
              backgroundColor: theme.dejarComentario,
              color: theme.black,
              border: `1px solid ${theme.borderColor}`,
            }}
          />
          <button
            className="btn ms-2"
            onClick={sendMessage}
            style={{
              backgroundColor: theme.boton.base.backgroundColor,
              color: theme.boton.base.color,
              border: theme.boton.base.border,
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  </>
)

}

/* import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Conexión al backend
const socket = io("http://localhost:3000");

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("UsuarioDemo"); // Se puede cambiar por usuario real

  // Recibir mensajes
  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("chat message");
  }, []);

  // Enviar mensaje
  const sendMessage = () => {
    if (message.trim()) {
      const msgObject = {
        id: Date.now(), // ID temporal
        user,
        content: message,
        timestamp: new Date().toISOString(),
        eventId: 1, // ID del evento actual
      };

      socket.emit("chat message", msgObject);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat en Tiempo Real</h1>

      <ul>
        {messages.map((m) => (
          <li key={m.id}>
            <strong>{m.user}</strong> [{new Date(m.timestamp).toLocaleTimeString()}]:{" "}
            {m.content}
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
      />

      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
 */

/* import { useEffect, useState } from "react"
import { io } from "socket.io-client"

const socket = io("http://localhost:3000")

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg])
    })

    return () => socket.off("chat message")
  }, [])

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat message", message)
      setMessage("")
    }
  }

  return (
    <div>
      <h1>Chat en Tiempo Real</h1>

      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
      />

      <button onClick={sendMessage}>Enviar</button>
    </div>
  )
}
 */

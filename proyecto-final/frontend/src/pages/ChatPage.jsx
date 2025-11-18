import { useEffect, useState } from "react"
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

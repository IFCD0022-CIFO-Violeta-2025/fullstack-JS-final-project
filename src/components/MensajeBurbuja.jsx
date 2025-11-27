/* import React, { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext" */

export default function MensajeBurbuja({ message, isMe }) {
  /*   const { theme } = useContext(ThemeContext) */

  return (
    <li className={`mb-2 d-flex ${isMe ? "justify-content-end" : "justify-content-start"}`}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "white" }}>
        {" "}
        {/* cambiar colo con ThemeContext! */}
        {/* Avatar a la izquierda si no es mensaje propio */}
        {!isMe && (
          <img
            src={message.avatar}
            alt={message.user}
            style={{
              width: "45px",
              height: "45px",
              margin: "0 6px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )}
        {/* Burbuja del mensaje */}
        <div
          style={{
            background: "#9569FF",
            borderRadius: "8px",
            padding: "4px 10px",
            position: "relative",
            maxWidth: "calc(100% - 55px)",
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
              borderLeft: isMe ? "8px solid #9569FF" : "none",
              borderRight: isMe ? "none" : "8px solid #9569FF",
            }}
          />

          <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>{message.user}</div>
          <div>{message.content}</div>
          <div style={{ fontSize: "0.75rem", opacity: 0.7, marginTop: "2px" }}>
            🕒 {message.timestamp}
          </div>
        </div>
        {/* Avatar a la derecha si es mensaje propio */}
        {isMe && (
          <img
            src={message.avatar}
            alt={message.user}
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

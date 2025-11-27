/* import React, { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext" */
import { FaRegClock } from "react-icons/fa"

export default function MensajeBurbuja({ message, isMe }) {
  /*   const { theme } = useContext(ThemeContext) */

  return (
    <li className={`mb-2 d-flex ${isMe ? "justify-content-end" : "justify-content-start"}`}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "white" }}>
        {/* cambiar colo con ThemeContext! */}
        {/* avatar a la izquierda si no es mensaje propio */}
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
        {/* burbuja del mensaje */}
        <div
          style={{
            background: "#9569FF",
            borderRadius: "8px",
            padding: "4px 10px",
            position: "relative",
            maxWidth: "calc(100% - 55px)",
            wordBreak: "break-word",
            textAlign: isMe ? "right" : "left",
          }}
        >
          {/*triángulo de la burbuja*/}
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
          <div
            className="d-flex align-items-center"
            style={{ fontSize: "0.75rem", opacity: 0.7, marginTop: "2px" }}
          >
            <span style={{ marginTop: "-3px", marginRight: "4px" }}>
              <FaRegClock />
            </span>{" "}
            <span>{message.timestamp}</span>
          </div>
        </div>
        {/* avatar a la derecha si es mensaje propio */}
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

import React from "react"

function AccionesEvento({ likes, commentsCount, onShare, onSave }) {
  return (
    <div className="d-flex justify-content-around my-3">
      {/* Me gusta */}
      <div style={{ cursor: "pointer" }}>❤️ {likes}</div>
      {/* Comentarios */}
      <div style={{ cursor: "pointer" }}>💬 {commentsCount}</div>
      {/* Compartir */}
      <div style={{ cursor: "pointer" }} onClick={onShare}>
        🔗 Compartir
      </div>
      {/* Guardar */}
      <div style={{ cursor: "pointer" }} onClick={onSave}>
        📌 Guardar
      </div>
    </div>
  )
}

export default AccionesEvento

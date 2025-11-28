import { BsChatRightFill } from "react-icons/bs"
import { FaHeart } from "react-icons/fa"
import { FaShareAlt } from "react-icons/fa"

function AccionesEvento({ likes, commentsCount, onShare }) /*  onSave */ {
  return (
    <div className="d-flex justify-content-around my-3">
      {/* Me gusta */}
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: "6px" }}>
        <span style={{ marginTop: "-5px", color: "red" }}>
          <FaHeart />
        </span>
        <span>{likes}</span>
      </div>
      {/* Comentarios */}
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: "6px" }}>
        <span style={{ marginTop: "-3px" }}>
          <BsChatRightFill />
        </span>
        <span>{commentsCount}</span>
      </div>
      {/* Compartir */}
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: "6px" }}
        onClick={onShare}
      >
        <span style={{ marginTop: "-3px" }}>
          <FaShareAlt />
        </span>
        <span>Compartir</span>
      </div>
      {/* Guardar */}
      {/*       <div style={{ cursor: "pointer" }} onClick={onSave}>
        📌 Guardar
      </div> */}
    </div>
  )
}

export default AccionesEvento

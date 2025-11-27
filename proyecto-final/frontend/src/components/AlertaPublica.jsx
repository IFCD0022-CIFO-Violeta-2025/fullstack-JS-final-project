import React, { useState, useEffect } from "react"
import { IoIosCloseCircleOutline } from "react-icons/io"

const AlertaPublica = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const cerrado = localStorage.getItem("alertaPublicaCerrada")
    if (cerrado === "true") setVisible(false)
  }, [])

  const cerrarAlerta = () => {
    setVisible(false)
    localStorage.setItem("alertaPublicaCerrada", "true")
  }

  if (!visible) return null

  return (
    <div className="row m-4">
      <div
        className="col card pt-3 position-relative"
        style={{
          maxWidth: "600px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <button
          onClick={cerrarAlerta}
          style={{
            position: "absolute",
            top: "6px",
            right: "8px",
            background: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          <IoIosCloseCircleOutline />
        </button>
        <p>
          Contenido público. <a href="/login">Inicia sesión</a> o <a href="/register">registrate</a>{" "}
          para ver contenido exclusivo.
        </p>
      </div>
    </div>
  )
}

export default AlertaPublica

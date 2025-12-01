import React, { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"
import Boton from "./Boton"
import Etiqueta from "./Etiqueta"
import UsuarioInfo from "./UsuarioInfo"
import { eventoMock } from "../data/mockData"
import AccionesEvento from "./AccionesEvento"
import { useNavigate } from "react-router-dom"
import { MdPlace } from "react-icons/md"
import { FaCalendarCheck } from "react-icons/fa"
import { LuAlarmClockCheck } from "react-icons/lu"

const Card = () => {
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()

  // usamos directamente los datos del mock

  const {
    titulo,
    descripcion,
    ubicacion,
    fechas,
    horaInicio,
    inscritos,
    categorias,
    usuario,
    img,
    likes,
    commentsCount,
  } = eventoMock

  let fechaTexto = ""
  if (fechas.length === 1) {
    const f = new Date(fechas[0])
    fechaTexto = `${f.getDate()} de ${f.toLocaleDateString("es-ES", {
      month: "long",
    })}`
  } else {
    const fechasOrdenadas = fechas.map((f) => new Date(f)).sort((a, b) => a - b)
    const fInicio = fechasOrdenadas[0]
    const fFin = fechasOrdenadas[fechasOrdenadas.length - 1]

    fechaTexto = `Del ${fInicio.getDate()} de ${fInicio.toLocaleDateString("es-ES", {
      month: "long",
    })} al ${fFin.getDate()} de ${fFin.toLocaleDateString("es-ES", {
      month: "long",
    })}`
  }

  return (
    <div className="mx-2 mb-5">
      <div
        className="card h-100 mx-auto"
        style={{
          backgroundColor: theme.cardColor,
          color: theme.textColor,
          maxWidth: "450px",
          minWidth: "350px",
          width: "100%",
          boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* usuario que publicó */}
        <UsuarioInfo usuario={usuario} />

        {/* imagen arriba con borde inferior fino */}
        <div>
          <img
            src={img}
            alt="Imagen del evento"
            style={{
              height: "200px",
              objectFit: "cover",
              width: "100%",
              display: "block",
            }}
          />
        </div>

        {/* contenido */}
        <div className="card-body d-flex flex-column h-100">
          <div className="flex-grow-1">
            <h5 className="card-title">{titulo}</h5>

            <p
              className="card-text"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {descripcion}
            </p>

            <div className="mt-2 text-sm">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: "1px",
                  marginBottom: "1rem",
                }}
              >
                <span>
                  <strong>Lugar:</strong>
                </span>
                <span style={{ marginTop: "-8px", fontSize: "18px" }}>
                  <MdPlace />
                </span>
                <span>{ubicacion}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: "3px",
                  marginBottom: "1rem",
                }}
              >
                <span>
                  <strong>Fecha:</strong>
                </span>
                <span style={{ marginTop: "-6px", fontSize: "15px" }}>
                  <FaCalendarCheck />
                </span>
                <span>{fechaTexto}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: "3px",
                  marginBottom: "1rem",
                }}
              >
                <span>
                  <strong>Hora inicio:</strong>
                </span>
                <span style={{ marginTop: "-5px" }}>
                  <LuAlarmClockCheck />
                </span>
                <span>{horaInicio}</span>
              </div>

              <div className="mb-1 d-flex">
                <strong className="me-1">Asistentes inscritos:</strong>
                <span>{inscritos}</span>
              </div>
            </div>
          </div>

          {/* botones y etiquetas */}
          <div className="mt-3">
            <div className="d-flex gap-2 justify-content-start mb-4">
              {/* Cambio importante: usamos navigate en lugar de window.open */}
              <Boton onClick={() => navigate("/event")}>Ver más</Boton>

              <Boton onClick={() => navigate("/event")}>Inscribirse</Boton>
            </div>

            <Etiqueta categorias={categorias} />
          </div>

          {/* linea divisoria */}
          <div
            className="d-flex align-items-center mt-3"
            style={{ borderTop: "1px solid #ddd", paddingTop: "0.5rem" }}
          ></div>

          {/* acciones evento */}
          <AccionesEvento
            likes={likes}
            commentsCount={commentsCount}
            onShare={() => alert("Compartir evento")}
            onSave={() => alert("Evento guardado")}
          />
        </div>
      </div>
    </div>
  )
}

export default Card

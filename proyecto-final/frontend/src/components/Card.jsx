import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ThemeContext } from "../contexts/ThemeContext"
import Boton from "./Boton"
import Etiqueta from "./Etiqueta"
import UsuarioInfo from "./UsuarioInfo"
import AccionesEvento from "./AccionesEvento"

const Card = ({ evento }) => {
  const navigate = useNavigate()
  const { theme } = useContext(ThemeContext)

  // Calcular fecha texto
  let fechaTexto = ""
  if (evento.fechas.length === 1) {
    const f = new Date(evento.fechas[0])
    fechaTexto = `${f.getDate()} de ${f.toLocaleDateString("es-ES", { month: "long" })}`
  } else {
    const fechasOrdenadas = evento.fechas.map((f) => new Date(f)).sort((a, b) => a - b)
    const fInicio = fechasOrdenadas[0]
    const fFin = fechasOrdenadas[fechasOrdenadas.length - 1]
    fechaTexto = `Del ${fInicio.getDate()} de ${fInicio.toLocaleDateString("es-ES", { month: "long" })} al ${fFin.getDate()} de ${fFin.toLocaleDateString("es-ES", { month: "long" })}`
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
        <UsuarioInfo usuario={evento.usuario} />

        <div>
          <img
            src={evento.img}
            alt={evento.titulo}
            style={{ height: "200px", objectFit: "cover", width: "100%", display: "block" }}
          />
        </div>

        <div className="card-body d-flex flex-column h-100">
          <div className="flex-grow-1">
            <h5 className="card-title">{evento.titulo}</h5>
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
              {evento.descripcion}
            </p>

            <div className="mt-2 text-sm">
              <div className="mb-1 d-flex">
                <strong className="me-1">Lugar:</strong>
                <span>📍 {evento.ubicacion}</span>
              </div>

              <div className="mb-1 d-flex">
                <strong className="me-1">Fecha:</strong>
                <span>🗓️ {fechaTexto}</span>
              </div>

              <div className="mb-1 d-flex">
                <strong className="me-1">Hora:</strong>
                <span>⏰ {evento.horaInicio}</span>
              </div>

              <div className="mb-1 d-flex">
                <strong className="me-1">Asistentes inscritos:</strong>
                <span>{evento.inscritos}</span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="d-flex gap-2 justify-content-center mb-4">
              <Boton onClick={() => navigate(`/event/${evento.id}`)}>Ver más</Boton>
              <Boton>Inscribirse</Boton>
            </div>

            <Etiqueta categorias={evento.categorias} />
          </div>

          <div
            className="d-flex align-items-center mt-3"
            style={{ borderTop: "1px solid #ddd", paddingTop: "0.5rem" }}
          ></div>

          <AccionesEvento
            likes={evento.likes}
            commentsCount={evento.commentsCount}
            onShare={() => alert("Compartir evento")}
            onSave={() => alert("Evento guardado")}
          />
        </div>
      </div>
    </div>
  )
}

export default Card
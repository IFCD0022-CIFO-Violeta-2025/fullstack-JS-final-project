import React, { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"
import Boton from "./Boton"
import Etiqueta from "./Etiqueta"
import UsuarioInfo from "./UsuarioInfo"
import { eventoMock } from "../data/mockData" // 👉 importamos el mock

const Card = () => {
  const { theme } = useContext(ThemeContext)

  // 👉 usamos directamente los datos del mock
  const { titulo, descripcion, ubicacion, fechas, horaInicio, categorias, usuario, img } =
    eventoMock

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
          maxWidth: "360px",
          minWidth: "280px",
          width: "100%",
          boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Imagen arriba con borde inferior fino */}
        <div
          style={{
            borderBottom: `2px solid ${theme.boton.base.backgroundColor}`,
            borderRadius: "4px 4px 0 0",
            overflow: "hidden",
          }}
        >
          <img
            src={img}
            className="card-img-top"
            alt="Imagen del evento"
            style={{
              height: "200px",
              objectFit: "cover",
              width: "100%",
              display: "block",
            }}
          />
        </div>

        {/* Contenido */}
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
              <div className="mb-1">
                <strong>Lugar:</strong> 📍 {ubicacion}
              </div>
              <div className="mb-1">
                <strong>Fecha:</strong> 🗓️ {fechaTexto}
              </div>
              <div className="mb-1">
                <strong>Hora:</strong> ⏰ {horaInicio}
              </div>
            </div>
          </div>

          {/* Botones y etiquetas */}
          <div className="mt-3">
            <div className="d-flex gap-2 justify-content-center mb-4">
              <Boton onClick={() => window.open("/event", "_blank")}>Ver más</Boton>
              <Boton>Inscribirse</Boton>
            </div>

            <Etiqueta categorias={categorias} />
          </div>

          {/* linea divisoria */}
          <div
            className="d-flex align-items-center mt-3"
            style={{ borderTop: "1px solid #ddd", paddingTop: "0.5rem" }}
          ></div>

          {/* Usuario que publicó */}
          <UsuarioInfo usuario={usuario} />
        </div>
      </div>
    </div>
  )
}

export default Card

import React, { useContext } from "react"
import Boton from "../components/Boton"
import Etiqueta from "../components/Etiqueta"
import { ThemeContext } from "../contexts/ThemeContext"
import ComentariosEvento from "../components/ComentariosEvento"
import SocialIcon from "../components/SocialIcon"
import UsuarioInfo from "../components/UsuarioInfo"
import { eventoMock } from "../data/mockData" // 👉 importamos el mock

function EventPage() {
  const { theme } = useContext(ThemeContext)

  // 👉 usamos directamente el mock en lugar de definir evento aquí
  const evento = eventoMock

  // Lógica para mostrar fechas
  const getFechaTexto = (fechas) => {
    if (fechas.length === 1) {
      const f = new Date(fechas[0])
      return `${f.getDate()} de ${f.toLocaleDateString("es-ES", { month: "long" })}`
    } else {
      const fechasOrdenadas = fechas.map((f) => new Date(f)).sort((a, b) => a - b)
      const fInicio = fechasOrdenadas[0]
      const fFin = fechasOrdenadas[fechasOrdenadas.length - 1]
      return `Del ${fInicio.getDate()} de ${fInicio.toLocaleDateString("es-ES", { month: "long" })} al ${fFin.getDate()} de ${fFin.toLocaleDateString("es-ES", { month: "long" })}`
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "2rem",
        backgroundColor: theme.bodyColor,
      }}
    >
      <h1 className="text-center mb-4" style={{ color: theme.titleColor }}>
        EVENTOS
      </h1>

      <div
        className="detalle-evento card"
        style={{
          maxWidth: "900px",
          width: "100%",
          backgroundColor: theme.cardColor,
          color: theme.textColor,
          boxShadow: "6px 6px 12px rgba(0,0,0,0.15)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* Usuario y organizador */}
        <UsuarioInfo usuario={evento.usuario} />

        {/* Imagen del evento */}
        <img
          src={evento.img} // 👉 ahora usamos la imagen del mock
          alt={evento.titulo}
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />

        {/* Contenido del evento */}
        <div className="p-4">
          <h2>{evento.titulo}</h2>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>{evento.descripcion}</p>

          {/* Información del organizador y contacto */}
          <div style={{ marginTop: "1rem" }}>
            <p>
              <strong>Organizador:</strong> {evento.organizador}
            </p>
            <p>
              <strong>Contacto organizador:</strong> {evento.contacto}
            </p>
          </div>

          {/* Lugar, fechas y horarios */}
          <div style={{ marginTop: "1rem" }}>
            <p>
              <strong>Lugar:</strong> 📍 {evento.ubicacion}
            </p>
            <p>
              <strong>Fecha:</strong> 🗓️ {getFechaTexto(evento.fechas)}
            </p>
            <p>
              <strong>Hora inicio:</strong> ⏰ {evento.horaInicio}
            </p>
            <p>
              <strong>Hora fin:</strong> ⏰ {evento.horaFin}
            </p>
          </div>

          {/* Capacidad del evento */}
          <div style={{ marginTop: "1rem" }}>
            <p>
              <strong>Número mínimo de asistentes:</strong> {evento.asistentesMin}
            </p>
            <p>
              <strong>Número máximo de asistentes:</strong> {evento.asistentesMax}
            </p>
            <p>
              <strong>Asistentes inscritos:</strong> {evento.inscritos}
            </p>
          </div>

          {/* Fecha límite y recordatorio */}
          <div style={{ marginTop: "1rem" }}>
            <p>
              <strong>Fecha límite de reserva:</strong>{" "}
              {new Date(evento.fechaLimiteReserva).toLocaleDateString("es-ES")}
            </p>
            <p>
              <strong>Recordar 2 días antes:</strong>{" "}
              {evento.recordatorio2diasAntes ? "✅ Sí" : "❌ No"}
            </p>
          </div>

          {/* Redes Sociales */}
          <div className="d-flex gap-3 mt-3">
            <SocialIcon>+</SocialIcon>
            <SocialIcon>+</SocialIcon>
            <SocialIcon>+</SocialIcon>
          </div>

          {/* Botones de acción */}
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
            <Boton>Inscribirse</Boton>
            <Boton>Chat del evento</Boton>
          </div>

          {/* Etiquetas */}
          <div style={{ marginTop: "3rem" }}>
            <Etiqueta categorias={evento.categorias} />
          </div>

          {/* Mapa */}
          <div
            style={{
              marginTop: "2rem",
              width: "100%",
              height: "400px",
              backgroundColor: "#eee",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              fontSize: "1.2rem",
              color: "#555",
            }}
          >
            Aquí irá el mapa del evento
          </div>

          {/* Comentarios */}
          <ComentariosEvento comentarios={evento.comentarios} />
        </div>
      </div>
    </div>
  )
}

export default EventPage

import { useContext, useEffect, useState } from "react"
import Boton from "../components/Boton"
import Etiqueta from "../components/Etiqueta"
import { ThemeContext } from "../contexts/ThemeContext"
import ComentariosEvento from "../components/ComentariosEvento"
import SocialIcon from "../components/SocialIcon"
import UsuarioInfo from "../components/UsuarioInfo"
import { eventoMock } from "../data/mockData"
import AccionesEvento from "../components/AccionesEvento"
import Titulo from "../components/Titulo"
import ChatPage from "./ChatPage"

function EventPage() {
  const { theme } = useContext(ThemeContext)

  // Usamos directamente el mock en lugar de definir evento aquí
  const evento = eventoMock

  // Estado para el checkbox
  const [recordar, setRecordar] = useState(evento.recordatorio2diasAntes)

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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Titulo title="EVENTOS" />
      <div
        className="container eventPage"
        style={{
          backgroundColor: theme.bodyColor,
        }}
      >
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
            src={evento.img} // usamos la imagen del mock
            alt={evento.titulo}
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />

          {/* Contenido del evento */}
          <div className="p-4">
            <h1>{evento.titulo}</h1>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginTop: "2rem" }}>
              {evento.descripcion}
            </p>

            {/* Información del organizador y contacto */}
            <div style={{ marginTop: "2rem" }}>
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
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <strong>Recordar 2 días antes:</strong>
                <input
                  type="checkbox"
                  checked={recordar}
                  onChange={(e) => setRecordar(e.target.checked)}
                />
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="d-flex gap-3 mt-4">
              <SocialIcon>+</SocialIcon>
              <SocialIcon>+</SocialIcon>
              <SocialIcon>+</SocialIcon>
            </div>

            {/* Botones de acción */}
            <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
              <Boton>Inscribirse</Boton>
           {/*    <Boton>Chat</Boton> */}
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

            {/* Acciones evento */}
            <AccionesEvento
              likes={evento.likes}
              commentsCount={evento.commentsCount}
              onShare={() => alert("Compartir evento")}
              onSave={() => alert("Evento guardado")}
            />

            {/* Comentarios */}
            <ComentariosEvento comentarios={evento.comentarios} />
          </div>
        </div>
        <ChatPage />
      </div>
    </>
  )
}

export default EventPage

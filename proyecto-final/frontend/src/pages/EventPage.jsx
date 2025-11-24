import React, { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { ThemeContext } from "../contexts/ThemeContext"
import { EventContext } from "../contexts/EventContext"
import Boton from "../components/Boton"
import Etiqueta from "../components/Etiqueta"
import UsuarioInfo from "../components/UsuarioInfo"
import ComentariosEvento from "../components/ComentariosEvento"
import AccionesEvento from "../components/AccionesEvento"
import SocialIcon from "../components/SocialIcon"
import Titulo from "../components/Titulo"

function EventPage() {
  const { theme } = useContext(ThemeContext)
  const { eventos } = useContext(EventContext)
const { id } = useParams()
const evento = eventos.find((e) => e.id === Number(id))


  // Buscar el evento por id
  const [recordar, setRecordar] = useState(evento?.recordatorio2diasAntes || false)

  if (!evento) return <p>Evento no encontrado</p>

  // Función para formatear fechas
  const getFechaTexto = (fechas) => {
    if (!fechas) return ""
    if (fechas.length === 1) {
      const f = new Date(fechas[0])
      return `${f.getDate()} de ${f.toLocaleDateString("es-ES", { month: "long" })}`
    } else {
      const fechasOrdenadas = fechas.map((f) => new Date(f)).sort((a, b) => a - b)
      const fInicio = fechasOrdenadas[0]
      const fFin = fechasOrdenadas[fechasOrdenadas.length - 1]
      return `Del ${fInicio.getDate()} de ${fInicio.toLocaleDateString("es-ES", {
        month: "long",
      })} al ${fFin.getDate()} de ${fFin.toLocaleDateString("es-ES", { month: "long" })}`
    }
  }

  return (
    <>
      <Titulo title="EVENTO" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          /* ✅ Eliminado el padding superior: ahora la separación la controla solo <Titulo> */
          /* Mantengo padding lateral y inferior para que la página siga teniendo espacio */
          padding: "0 2rem 2rem 2rem",
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
          <UsuarioInfo usuario={evento.usuario} />

          <img
            src={evento.img}
            alt={evento.titulo}
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />

          <div className="p-4">
            <h1>{evento.titulo}</h1>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginTop: "2rem" }}>
              {evento.descripcion}
            </p>

            <div style={{ marginTop: "2rem" }}>
              <p>
                <strong>Organizador:</strong> {evento.organizador}
              </p>
              <p>
                <strong>Contacto organizador:</strong> {evento.contacto}
              </p>
            </div>

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

            <div style={{ marginTop: "1rem" }}>
              <p>
                <strong>Número mínimo de asistentes:</strong> {evento.asistentesMin}
              </p>
              <p>
                <strong>Número máximo de asistentes:</strong> {evento.asistentesMax}
              </p>
              <p>
                <strong>Asistentes inscritos:</strong> {evento.inscritos || 0}
              </p>
            </div>

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

            <div className="d-flex gap-3 mt-4">
              <SocialIcon>+</SocialIcon>
              <SocialIcon>+</SocialIcon>
              <SocialIcon>+</SocialIcon>
            </div>

            <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
              <Boton>Inscribirse</Boton>
              <Boton>Chat</Boton>
            </div>

            <div style={{ marginTop: "3rem" }}>
              <Etiqueta categorias={evento.categorias} />
            </div>

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

            <AccionesEvento
              likes={evento.likes}
              commentsCount={evento.commentsCount}
              onShare={() => alert("Compartir evento")}
              onSave={() => alert("Evento guardado")}
            />

            <ComentariosEvento comentarios={evento.comentarios} />
          </div>
        </div>
      </div>
    </>
  )
}

export default EventPage

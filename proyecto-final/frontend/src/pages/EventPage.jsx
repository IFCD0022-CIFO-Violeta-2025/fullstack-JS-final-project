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
import { RiTwitterXFill } from "react-icons/ri"
import { SiInstagram } from "react-icons/si"
import { FaFacebook } from "react-icons/fa"
import { MdPlace } from "react-icons/md"
import { FaCalendarCheck } from "react-icons/fa"
import { LuAlarmClockCheck } from "react-icons/lu"

function EventPage() {
  const { theme } = useContext(ThemeContext)

  // usamos directamente el mock en lugar de definir evento aquí
  const evento = eventoMock

  // estado para el checkbox
  const [recordar, setRecordar] = useState(evento.recordatorio2diasAntes)

  // lógica para mostrar fechas
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
          {/* usuario y organizador */}
          <UsuarioInfo usuario={evento.usuario} />

          {/* imagen del evento */}
          <img
            src={evento.img} // usamos la imagen del mock
            alt={evento.titulo}
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />

          {/* contenido del evento */}
          <div className="p-4">
            <h1>{evento.titulo}</h1>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginTop: "2rem" }}>
              {evento.descripcion}
            </p>

            {/* información del organizador y contacto */}
            <div style={{ marginTop: "2rem" }}>
              <p>
                <strong>Organizador:</strong> {evento.organizador}
              </p>
              <p>
                <strong>Contacto organizador:</strong> {evento.contacto}
              </p>
            </div>

            {/* lugar, fechas y horarios */}
            <div>
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
                <span>{evento.ubicacion}</span>
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
                <span>{getFechaTexto(evento.fechas)}</span>
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
                <span>{evento.horaInicio}</span>
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
                  <strong>Hora fin:</strong>
                </span>
                <span style={{ marginTop: "-5px" }}>
                  <LuAlarmClockCheck />
                </span>
                <span>{evento.horaFin}</span>
              </div>
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
              <SocialIcon>
                <RiTwitterXFill />
              </SocialIcon>
              <SocialIcon>
                <SiInstagram />
              </SocialIcon>
              <SocialIcon>
                <FaFacebook />
              </SocialIcon>
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

import React, { useState, useContext } from "react"
import Titulo from "../components/Titulo"
import { EventContext } from "../contexts/EventContext"
import userAvatar from "../assets/user.jpg"
import eventImg from "../assets/event.jpg" // imagen por defecto

function CreateEventPage() {
  const { agregarEvento } = useContext(EventContext)

  const [evento, setEvento] = useState({
    titulo: "",
    descripcion: "",
    organizador: "",
    contacto: "",
    ubicacion: "",
    fechas: ["", ""],
    horaInicio: "",
    horaFin: "",
    asistentesMin: 0,
    asistentesMax: 0,
    categorias: [],
    img: null, // <-- aquí guardaremos la imagen seleccionada
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setEvento((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const nuevoEvento = {
      ...evento,
      img: evento.img || eventImg,
      usuario: {
        nombre: evento.organizador,
        avatar: userAvatar,
        fechaPublicacion: new Date().toISOString().split("T")[0],
      },
      comentarios: [],
      likes: 0,
      commentsCount: 0,
      fechaLimiteReserva: evento.fechas[0],
      recordatorio2diasAntes: false,
      id: Date.now(), 
    }

    agregarEvento(nuevoEvento)
    alert("Evento creado correctamente")


    setEvento({
      titulo: "",
      descripcion: "",
      organizador: "",
      contacto: "",
      ubicacion: "",
      fechas: ["", ""],
      horaInicio: "",
      horaFin: "",
      asistentesMin: 0,
      asistentesMax: 0,
      categorias: [],
      img: null,
    })
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Titulo title="Crear Evento" />
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "600px", margin: "0 auto" }}
      >
        <input type="text" name="titulo" placeholder="Título" value={evento.titulo} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" value={evento.descripcion} onChange={handleChange} required />

        <input type="text" name="organizador" placeholder="Organizador" value={evento.organizador} onChange={handleChange} required />
        <input type="email" name="contacto" placeholder="Email de contacto" value={evento.contacto} onChange={handleChange} required />
        <input type="text" name="ubicacion" placeholder="Ubicación" value={evento.ubicacion} onChange={handleChange} required />

        <div style={{ display: "flex", gap: "1rem" }}>
          <div>
            <label>Fecha inicio</label>
            <input
              type="date"
              value={evento.fechas[0]}
              onChange={(e) => setEvento({ ...evento, fechas: [e.target.value, evento.fechas[1]] })}
              required
            />
          </div>
          <div>
            <label>Fecha fin</label>
            <input
              type="date"
              value={evento.fechas[1]}
              onChange={(e) => setEvento({ ...evento, fechas: [evento.fechas[0], e.target.value] })}
              required
            />
          </div>
        </div>
        <label>HoraInicio</label>
        <input type="time" name="horaInicio" placeholder="Hora inicio" value={evento.horaInicio} onChange={handleChange} required />
        <label>HoraFin</label>
        <input type="time" name="horaFin" placeholder="Hora fin" value={evento.horaFin} onChange={handleChange} required />
        <label>AsistentesMinimos</label>
        <input type="number" name="asistentesMin" placeholder="Asistentes mínimo" value={evento.asistentesMin} onChange={handleChange} required />
        <label>AsistentesMaximos</label>
        <input type="number" name="asistentesMax" placeholder="Asistentes máximo" value={evento.asistentesMax} onChange={handleChange} required />

        <input
          type="text"
          placeholder="Categorías (separadas por comas)"
          value={evento.categorias.join(", ")}
          onChange={(e) =>
            setEvento({
              ...evento,
              categorias: e.target.value.split(",").map((c) => c.trim()).filter((c) => c !== ""),
            })
          }
          required
        />

        <div>
          <label>Imagen del evento</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setEvento({ ...evento, img: URL.createObjectURL(e.target.files[0]) })
              }
            }}
            required
          />
          {evento.img && <img src={evento.img} alt="Vista previa" style={{ maxWidth: "100%", marginTop: "0.5rem" }} />}
        </div>

        <button type="submit">Crear Evento</button>
      </form>
    </div>
  )
}

export default CreateEventPage
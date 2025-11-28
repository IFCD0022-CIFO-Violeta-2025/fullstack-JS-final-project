import { useState, useContext } from "react"
import Titulo from "../components/Titulo"
import { ThemeContext } from "../contexts/ThemeContext"

function CreateEventPage() {
  const { theme } = useContext(ThemeContext)

  const [preview, setPreview] = useState(
    "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
  )

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <div className="container mt-4" style={{ color: theme.textColor }}>
      <Titulo title="Creación de evento" />

      <form action="/crear-evento" method="POST" encType="multipart/form-data">
        <div className="row align-items-end">
          {/* Imagen */}
          <div className="col-md-4 text-center">
            <label htmlFor="imagenEvento">
              <img
                src={preview}
                alt="Click para subir"
                className="img-fluid"
                style={{ cursor: "pointer", maxHeight: "200px" }}
              />
            </label>

            <input
              type="file"
              id="imagenEvento"
              name="imagenEvento"
              accept="image/*"
              className="d-none"
              onChange={handleImageChange}
            />
          </div>

          {/* Organizador */}
          <div className="col-md-4">
            <label htmlFor="organizador" className="form-label" style={{ color: theme.textColor }}>
              Organizador
            </label>
            <input
              type="text"
              className="form-control"
              id="organizador"
              name="organizador"
              required
            />
          </div>

          {/* Fecha creación */}
          <div className="col-md-4">
            <label
              htmlFor="fechaCreacion"
              className="form-label"
              style={{ color: theme.textColor }}
            >
              Fecha Creación evento
            </label>
            <input
              type="date"
              className="form-control"
              id="fechaCreacion"
              name="fechaCreacion"
              required
            />
          </div>
        </div>

        {/* Nombre del evento */}
        <div className="mb-3">
          <label htmlFor="nombreEvento" className="form-label" style={{ color: theme.textColor }}>
            Nombre del Evento
          </label>
          <input
            type="text"
            className="form-control"
            id="nombreEvento"
            name="nombreEvento"
            required
          />
        </div>

        {/* Descripción */}
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label" style={{ color: theme.textColor }}>
            Descripción
          </label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Dirección */}
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label" style={{ color: theme.textColor }}>
            Dirección
          </label>
          <input type="text" className="form-control" id="direccion" name="direccion" required />
        </div>

        {/* Fechas */}
        <div className="row">
          <div className="mb-3 col col-sm-6 col-md-4 col-lg-3">
            <label htmlFor="fechaInicio" className="form-label" style={{ color: theme.textColor }}>
              Fecha Inicio
            </label>
            <input
              type="date"
              className="form-control"
              id="fechaInicio"
              name="fechaInicio"
              required
            />
          </div>

          <div className="mb-3 col col-sm-6 col-md-4 col-lg-3">
            <label htmlFor="fechaFin" className="form-label" style={{ color: theme.textColor }}>
              Fecha Fin
            </label>
            <input type="date" className="form-control" id="fechaFin" name="fechaFin" required />
          </div>
        </div>

        {/* Horas */}
        <div className="row">
          <div className="mb-3 col col-sm-6 col-md-4 col-lg-3">
            <label htmlFor="horaInicio" className="form-label" style={{ color: theme.textColor }}>
              Hora Inicio
            </label>
            <input
              type="time"
              className="form-control"
              id="horaInicio"
              name="horaInicio"
              required
            />
          </div>

          <div className="mb-3 col col-sm-6 col-md-4 col-lg-3">
            <label htmlFor="horaFin" className="form-label" style={{ color: theme.textColor }}>
              Hora Fin
            </label>
            <input type="time" className="form-control" id="horaFin" name="horaFin" required />
          </div>
        </div>

        {/* Fecha límite */}
        <div className="row">
          <div className="mb-3 col col-sm-12 col-md-8 col-lg-6">
            <label htmlFor="fechaLimite" className="form-label" style={{ color: theme.textColor }}>
              Fecha Límite reserva
            </label>
            <input
              type="date"
              className="form-control"
              id="fechaLimite"
              name="fechaLimite"
              required
            />
          </div>
        </div>

        {/* Mínimo asistentes */}
        <div className="row">
          <div className="mb-3 col col-sm-12 col-md-8 col-lg-6">
            <label
              htmlFor="minimoAsistentes"
              className="form-label"
              style={{ color: theme.textColor }}
            >
              Número mínimo de asistentes
            </label>
            <input
              type="number"
              className="form-control"
              id="minimoAsistentes"
              name="minimoAsistentes"
              min="1"
              required
            />
          </div>
        </div>

        {/* Máximo asistentes */}
        <div className="row">
          <div className="mb-3 col col-sm-12 col-md-8 col-lg-6">
            <label
              htmlFor="maximoAsistentes"
              className="form-label"
              style={{ color: theme.textColor }}
            >
              Número máximo de asistentes
            </label>
            <input
              type="number"
              className="form-control"
              id="maximoAsistentes"
              name="maximoAsistentes"
              min="1"
              required
            />
          </div>
        </div>

        {/* Botón */}
        <div className="row">
          <div className="mb-3 col col-sm-12 col-md-8 col-lg-6">
            <button type="submit" className="btn btn-primary w-100">
              Crear Evento
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateEventPage

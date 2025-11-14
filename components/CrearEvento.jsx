import { useState } from "react";

export default function Login() {
    const [preview, setPreview] = useState("https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="container mt-4">
            <form action="/crear-evento" method="POST" encType="multipart/form-data">
                <div className="row align-items-end">
                    <div className="col-md-12">
                        <h1 className="text-center mt-4">Creación de evento</h1>
                    </div>
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
                    <div className="col-md-4">
                        <label htmlFor="organizador" className="form-label">Organizador</label>
                        <input type="text" className="form-control" id="organizador" name="organizador"
                            placeholder="Nombre del organizador" required />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="fechaCreacion" className="form-label">Fecha Creación evento</label>
                        <input type="date" className="form-control" id="fechaCreacion" name="fechaCreacion" required />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="nombreEvento" className="form-label">Nombre del Evento</label>
                    <input type="text" className="form-control" id="nombreEvento" name="nombreEvento"
                        placeholder="Nombre del evento" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripcion</label>
                    <textarea className="form-control" id="descripcion" name="descripcion" required rows="3"
                        placeholder="Descripcion"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Direccion</label>
                    <input type="text" className="form-control" id="direccion" name="direccion" placeholder="Direccion"
                        required />
                </div>
                <div className="row">
                    <div className="mb-3 col col-sm-6 col-md-4 col-lg-3">
                        <label htmlFor="fechaInicio" className="form-label">Fecha Inicio</label>
                        <input type="date" className="form-control" id="fechaInicio" name="fechaInicio" required />
                    </div>
                    <div className="mb-3 col col-sm-6 col-md-4 col-lg-3">
                        <label htmlFor="fechaFin" className="form-label">Fecha Fin</label>
                        <input type="date" className="form-control" id="fechaFin" name="fechaFin" required />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col col-sm-6 col-md-4 col-lg-3">
                        <label htmlFor="horaInicio" className="form-label">Hora Inicio</label>
                        <input type="time" className="form-control" id="horaInicio" name="horaInicio" required />
                    </div>
                    <div className="mb-3 col col-sm-6 col-md-4 col-lg-3">
                        <label htmlFor="horaFin" className="form-label">Hora Fin</label>
                        <input type="time" className="form-control" id="horaFin" name="horaFin" required />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col col-sm-12 col-md-8 col-lg-6">
                        <label htmlFor="fechaLimite" className="form-label">Fecha Limite reserva</label>
                        <input type="date" className="form-control" id="fechaLimite" name="fechaLimite" required />
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3 col col-sm-12 col-md-8 col-lg-6">
                        <label for="minimoAsistentes" class="form-label">Numero minimo de asistentes</label>
                        <input type="number" class="form-control" id="minimoAsistentes" name="minimoAsistentes"
                            placeholder="1" required min="1" />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col col-sm-12 col-md-8 col-lg-6">
                        <label htmlFor="maximoAsistentes" className="form-label">Numero máximo de asistentes</label>
                        <input type="number" className="form-control" id="maximoAsistentes" name="maximoAsistentes"
                            placeholder="1" required min="1" />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col col-sm-12 col-md-8 col-lg-6">
                        <button type="submit" className="btn btn-primary w-100">Crear Evento</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
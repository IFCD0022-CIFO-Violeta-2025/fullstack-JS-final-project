import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Boton from "./Boton";

const ComentariosEvento = ({ comentarios, onAgregarComentario }) => {
    const { theme } = useContext(ThemeContext);
    const [nuevoComentario, setNuevoComentario] = useState("");

    const manejarEnvio = () => {
        if (nuevoComentario.trim() === "") return;

        if (onAgregarComentario) {
            onAgregarComentario({
                usuario: "Usuario",
                mensaje: nuevoComentario,
            });
        }

        setNuevoComentario("");
    };

    return (
        <div
            className="card mt-5 shadow-sm"
            style={{
                backgroundColor: theme.cardColor,
                color: theme.textColor,
                borderRadius: "10px",
            }}
        >
            {/* --- Título --- */}
            <div
                className="card-header"
                style={{
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    backgroundColor: theme.cardColor,
                    color: theme.titleColor,
                    borderBottom: "1px solid rgba(255,255,255,0.15)",
                }}
            >
                Comentarios
            </div>

            {/* --- Lista --- */}
            {comentarios.length === 0 ? (
                <div className="card-body">No hay comentarios aún.</div>
            ) : (
                <ul className="list-group list-group-flush">
                    {comentarios.map((c, index) => (
                        <li
                            key={index}
                            className="list-group-item"
                            style={{
                                backgroundColor: theme.cardColor,
                                color: theme.textColor,
                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                                padding: "1rem",
                            }}
                        >
                            <strong>{c.usuario}:</strong> <span>{c.mensaje}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* --- Formulario para comentar --- */}
            <div className="p-3 mt-3">
                <label style={{ fontWeight: "bold", marginBottom: "8px", display: "block" }}>
                    Añadir un comentario
                </label>

                <textarea
                    className="form-control"
                    value={nuevoComentario}
                    onChange={(e) => setNuevoComentario(e.target.value)}
                    placeholder="Escribe tu comentario aquí..."
                    rows="3"
                    style={{
                        backgroundColor: theme.bodyColor,
                        color: theme.textColor,
                        border: "2px solid rgba(255,255,255,0.25)",
                        marginBottom: "1rem",
                    }}
                />

                <Boton onClick={manejarEnvio}>Enviar comentario</Boton>
            </div>
        </div>
    );
};

export default ComentariosEvento;
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Boton from "./Boton";
import Etiquetas from "./Etiquetas";

const Card = ({
    titulo = "Festival de Música Urbana",
    descripcion = "Únete a nosotros para una noche llena de ritmo, talento local y buena vibra. Este texto es muy largo y debería cortarse con puntos suspensivos para que la tarjeta mantenga siempre el mismo tamaño sin importar la longitud del contenido.",
    ubicacion = "Barcelona",
    fechas = ["2025-11-25"],
    hora = "20:00h",
    categorias = ["Música", "Cultura", "Danza", "Teatro"],
    usuario = {
        nombre: "Nombre",
        avatar: "/user.jpg", // ruta de la imagen del usuario
        fechaPublicacion: "2025-11-01",
    },
}) => {
    const { theme, isDarkMode } = useContext(ThemeContext);


    let fechaTexto = "";
    if (fechas.length === 1) {
        const f = new Date(fechas[0]);
        fechaTexto = `${f.getDate()} de ${f.toLocaleDateString("es-ES", {
            month: "long",
        })}`;
    } else {

        const fechasOrdenadas = fechas
            .map((f) => new Date(f))
            .sort((a, b) => a - b);
        const fInicio = fechasOrdenadas[0];
        const fFin = fechasOrdenadas[fechasOrdenadas.length - 1];


        fechaTexto = `Del ${fInicio.getDate()} de ${fInicio.toLocaleDateString(
            "es-ES",
            { month: "long" }
        )} al ${fFin.getDate()} de ${fFin.toLocaleDateString("es-ES", {
            month: "long",
        })}`;
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
                        src="/event.jpg"
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
                                <strong>Hora:</strong> ⏰ {hora}
                            </div>
                        </div>
                    </div>

                    {/* Botones y etiquetas */}
                    <div className="mt-3">
                        <div className="d-flex gap-2 justify-content-center mb-4">
                            <Boton onClick={() => window.open("/evento-detalle", "_blank")}>
                                Ver más
                            </Boton>
                            <Boton>Inscribirse</Boton>
                        </div>

                        <Etiquetas categorias={categorias} />
                    </div>

                    {/* Usuario que publicó */}
                    <div
                        className="d-flex align-items-center mt-3"
                        style={{ borderTop: "1px solid #ddd", paddingTop: "0.5rem" }}
                    >
                        <img
                            src={usuario.avatar}
                            alt={usuario.nombre}
                            style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginRight: "0.5rem",
                            }}
                        />
                        <div style={{ fontSize: "0.85rem", color: theme.textColor }}>
                            <div>{usuario.nombre}</div>
                            <div style={{ fontSize: "0.75rem" }}>
                                {new Date(usuario.fechaPublicacion).toLocaleDateString(
                                    "es-ES",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
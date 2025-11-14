import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Boton from "./Boton";

const Sidebar = ({ isOpen, onClose }) => {
    const { theme } = useContext(ThemeContext);

    // ordenar alfabeticamente
    const categorias = [
        "Aventura",
        "Bienestar",
        "Ciencia",
        "Danza",
        "Deporte",
        "Espiritualidad",
        "Frikis",
        "Gastronomía",
        "Infantiles",
        "Manualidades",
        "Música",
        "Populares",
        "Teatro",
        "Temático",
        "Tradicional",
        "Singles",
        "Naturaleza",
        "Cultura",
    ];

    // placeholder para calendario
    const miniCalendario = (
        <div
            style={{
                width: "100%",
                aspectRatio: "1 / 1",
                backgroundColor: "#ffffff20",
                borderRadius: "10px",
                border: "1px solid #ffffff40",
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "14px",
            }}
        >
            Mini Calendario
        </div>
    );

    return (
        <>
            {/* Sidebar fijo en pantallas grandes */}
            <div
                className="d-none d-lg-flex flex-column flex-shrink-0 px-5 pt-4 vh-100 sidebar position-fixed"
                style={{
                    width: "300px",
                    backgroundColor: theme.sidebarColor,
                    color: theme.textColor,
                    borderRight: theme.sidebarBorder,
                }}
            >

                <h5 className="mb-3 mx-2 text-white">Categorías</h5>

                <div
                    className="d-flex flex-column gap-2 sidebar-scroll"
                    style={{
                        overflowY: "auto",
                        flexGrow: 1,
                        maxHeight: "100%",
                        paddingRight: "1rem",
                        paddingBottom: "4rem",
                    }}
                >
                    {categorias.map((categoria) => (
                        <Boton key={categoria}>{categoria}</Boton>
                    ))}

                    {/* MINI CALENDARIO en desktop */}
                    {miniCalendario}
                </div>
            </div>

            {/* Sidebar overlay en móvil */}
            {isOpen && (
                <div
                    className="d-lg-none position-fixed top-0 start-0 vh-100 vw-100"
                    style={{
                        backgroundColor: theme.sidebarColor,
                        color: theme.textColor,
                        zIndex: 1050,
                    }}
                >
                    <div className="p-3 d-flex justify-content-between align-items-center">
                        <h5 className="text-white">Categorías</h5>
                        <Boton onClick={onClose}>Cerrar</Boton>
                    </div>
                    <div
                        className="d-flex flex-column gap-2 p-3"
                        style={{
                            overflowY: "auto",
                            maxHeight: "calc(100% - 60px)",
                            paddingBottom: "4rem",
                            alignItems: "flex-start",
                        }}
                    >
                        {categorias.map((categoria) => (
                            <Boton key={categoria}>{categoria}</Boton>
                        ))}

                        {/* MINI CALENDARIO en móvil */}
                        {miniCalendario}
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
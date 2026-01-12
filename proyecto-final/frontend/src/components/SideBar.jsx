import React, { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"
import Boton from "./Boton"
import MiniCalendario from "./miniCalendario"

const Sidebar = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext)

  // ordenar alfabeticamente
  const categorias = [
    "Arte",
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
  ]

  return (
    <>
      {/* Sidebar fijo en pantallas grandes */}
      <div
        className="d-none d-lg-flex flex-column flex-shrink-0 px-5 pt-4 vh-100 sidebar position-fixed"
        style={{
          top: 60, 
          width: "300px",
          backgroundColor: theme.sidebarColor,
          color: theme.textColor,
          borderRight: theme.sidebarBorder,
        }}
      >
        {/* Título arriba */}
        <h5 className="mb-3 mx-2 text-white">Categorías</h5>

        {/* Contenedor principal: debe permitir que su hijo haga scroll */}
        <div
          className="d-flex flex-column flex-grow-1"
          style={{
            paddingRight: "1rem",
            minHeight: 0, // imprescindible para que el hijo con overflow pueda scrollear
          }}
        >
          {/* Lista scrollable de botones */}
          <div
            className="d-flex flex-column gap-2 sidebar-scroll"
            style={{
              overflowY: "auto",
              flexGrow: 1, //  ocupa todo el espacio disponible entre el título y el calendario
              paddingBottom: "0.5rem",
              minHeight: 0, //  asegura que el overflow funcione dentro de flex
            }}
          >
            {categorias.map((categoria) => (
              <Boton style={{margin: "0 8px"}} key={categoria}>{categoria}</Boton>
            ))}
          </div>

          {/* MINI CALENDARIO fijo debajo */}
          <MiniCalendario />

          {/* Espacio al final del sidebar */}
          <div style={{ height: "2rem" }}></div>
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

          {/* Contenedor principal en móvil */}
          <div
            className="d-flex flex-column p-3"
            style={{
              height: "calc(100% - 60px)", //  resto de la pantalla bajo la barra superior
              minHeight: 0, // necesario para que el hijo con overflow scrollee
            }}
          >
            {/* Lista scrollable de botones */}
            <div
              className="d-flex flex-column gap-2"
              style={{
                overflowY: "auto",
                flexGrow: 1,
                paddingBottom: "0.5rem",
                minHeight: 0,
                alignItems: "flex-start",
              }}
            >
              {categorias.map((categoria) => (
                <Boton key={categoria}>{categoria}</Boton>
              ))}
            </div>

            {/* MINI CALENDARIO fijo debajo en móvil */}
            <MiniCalendario />
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar

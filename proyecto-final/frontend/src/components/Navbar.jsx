import { useContext, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ThemeContext } from "../contexts/ThemeContext"
import { AuthContext } from "../contexts/AuthContext"
import logo from "/logo.png"
import Boton from "./Boton"
import Sidebar from "./SideBar"
import BotonNavbar from "./BotonNavbar"
import UsuarioNavbar from "./UsuarioNavbar"

const Navbar = () => {
  const { toggleTheme, theme, isDarkMode } = useContext(ThemeContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <nav
        className="navbar navbar-dark navbar-expand-lg fixed-top"
        style={{
          backgroundColor: theme.navbarBG,
          borderBottom: theme.navbarBorder,
        }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand d-flex align-items-center ms-5"
            href="/"
            style={{ color: theme.textColor }}
          >
            <img
              src={logo}
              alt="logo Armand Events"
              width="40"
              height="40"
              className="d-inline-block align-text-top me-2"
            />
          </a>

          {/* Botón para abrir Sidebar en móvil */}
          <div className="d-lg-none">
            <Boton onClick={() => setSidebarOpen(true)}>Sidebar</Boton>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex gap-2 me-auto">
              <BotonNavbar onClick={() => navigate("/")} active={location.pathname === "/"}>
                Home
              </BotonNavbar>
              <BotonNavbar
                onClick={() => navigate("/profile")}
                active={location.pathname === "/profile"}
              >
                Perfil
              </BotonNavbar>
              <BotonNavbar
                onClick={() => navigate("/my-events")}
                active={location.pathname === "/my-events"}
              >
                Agenda
              </BotonNavbar>
              <BotonNavbar
                onClick={() => navigate("/history")}
                active={location.pathname === "/history"}
              >
                Historia
              </BotonNavbar>
              <BotonNavbar onClick={() => navigate("/faq")} active={location.pathname === "/faq"}>
                FAQ
              </BotonNavbar>
              <BotonNavbar
                onClick={() => navigate("/create")}
                active={location.pathname === "/create"}
              >
                Crear Evento
              </BotonNavbar>
            </div>

            <div className="d-flex gap-2">
              {/* Si NO hay usuario, mostramos ambos botones */}
              {!user && (
                <>
                  <Boton onClick={() => navigate("/login")}>Login</Boton>
                  <Boton onClick={() => navigate("/login")}>Sign in</Boton>
                </>
              )}

              {/* Si hay usuario, mostramos su nombre + Logout */}
              {user && <UsuarioNavbar />}

              {/* Botón para chat */}
              {/* <Boton onClick={() => navigate("/chat")}>Chat</Boton> */}

              {/* Botón para cambiar tema */}
              <Boton onClick={toggleTheme}>{isDarkMode ? "Claro" : "Oscuro"}</Boton>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}

export default Navbar

import { useContext, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ThemeContext } from "../contexts/ThemeContext"
import { AuthContext } from "../contexts/AuthContext"
/* import logo from "/logo.png" */
import logo from "/logo.svg"
import Boton from "./Boton"
import BotonTema from "./BotonTema"
import Sidebar from "./SideBar"
import BotonNavbar from "./BotonNavbar"
import UsuarioNavbar from "./UsuarioNavbar"
import { FaRegMoon } from "react-icons/fa"
import { MdSunny } from "react-icons/md"
import { FaBars } from "react-icons/fa"

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
        <div className="container-fluid" style={{ position: "relative" }}>
          <a
            className="navbar-brand d-flex align-items-center ms-5"
            href="/"
            style={{ color: theme.textColor }}
          >
            <img
              src={logo}
              alt="logo Armand Events"
              width="45"
              height="45"
              className="d-inline-block align-text-top logo"
            />
          </a>
          {/* botón para abrir Sidebar en móvil */}
          {/*   <div className="d-lg-none">
            <Boton onClick={() => setSidebarOpen(true)}>#</Boton>
          </div> */}
          <div className="d-lg-none">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              style={{
                position: "absolute",
                top: 120,
                right: 20,
                borderWidth: "3px",
                borderColor: "white",
                borderStyle: "solid",
                borderRadius: "6px",
                backgroundColor: "transparent",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontWeight: "500",
                color: "white",
              }}
            >
              #
            </button>
          </div>
          {/*         <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ position: "absolute", top: 10, right: 22 }}
          >
            <FaBars style={{ color: "white", fontSize: "24px" }} />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex gap-2 me-auto">
              <BotonNavbar onClick={() => navigate("/")} active={location.pathname === "/"}>
                Inicio
              </BotonNavbar>

              {/* si hay usuario, mostramos los botones del menú */}
              {user && (
                <>
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
                    onClick={() => navigate("/create")}
                    active={location.pathname === "/create"}
                  >
                    Crear Evento
                  </BotonNavbar>
                </>
              )}
              <BotonNavbar onClick={() => navigate("/faq")} active={location.pathname === "/faq"}>
                FAQ
              </BotonNavbar>

              <BotonNavbar
                onClick={() => navigate("/history")}
                active={location.pathname === "/history"}
              >
                Historia
              </BotonNavbar>
            </div>
          </div>
          <div className="d-flex btn-user">
            {!user && (
              <div className="d-flex gap-3 mx-2">
                <Boton onClick={() => navigate("/login")}>Iniciar</Boton>
                <Boton onClick={() => navigate("/register")}>Registro</Boton>
              </div>
            )}

            {user && <UsuarioNavbar />}

            <BotonTema onClick={toggleTheme}>{isDarkMode ? <FaRegMoon /> : <MdSunny />}</BotonTema>
          </div>
        </div>
      </nav>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}

export default Navbar

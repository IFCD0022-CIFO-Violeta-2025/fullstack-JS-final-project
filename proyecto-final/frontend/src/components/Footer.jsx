import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"
import BotonNavbar from "./BotonNavbar"
import { useNavigate, useLocation } from "react-router-dom"

export default function Footer() {
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: theme.navbarBG,
        color: theme.white,
        borderTop: theme.navbarBorder,
      }}
    >
     <div className="footer__inner">
        <BotonNavbar
          onClick={() => navigate("/contacto")}
          active={location.pathname === "/contacto"}
        >
          Contacto
        </BotonNavbar>
        <BotonNavbar
          onClick={() => navigate("/terminos")}
          active={location.pathname === "/terminos"}
        >
          Términos
        </BotonNavbar>
        <BotonNavbar
          onClick={() => navigate("/privacidad")}
          active={location.pathname === "/privacidad"}
        >
          Privacidad
        </BotonNavbar>
      </div>
    </footer>
  )
}

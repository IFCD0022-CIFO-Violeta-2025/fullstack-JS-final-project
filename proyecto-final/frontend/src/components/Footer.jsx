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
          onClick={() => navigate("/normativa")}
          active={location.pathname === "/normativa"}
        >
          Normativa
        </BotonNavbar>
        <BotonNavbar
          onClick={() => navigate("/privacidad")}
          active={location.pathname === "/privacidad"}
        >
          Privacidad
        </BotonNavbar>

        <BotonNavbar onClick={() => navigate("/cookies")} active={location.pathname === "/cookies"}>
          Cookies
        </BotonNavbar>
      </div>
    </footer>
  )
}

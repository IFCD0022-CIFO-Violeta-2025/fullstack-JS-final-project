import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

export default function Footer() {
  const { theme } = useContext(ThemeContext)

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
        <span>Contacto</span>
        <span>Términos</span>
        <span>Privacidad</span>
      </div>
    </footer>
  )
}

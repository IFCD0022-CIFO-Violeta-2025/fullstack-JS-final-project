import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"
import Titulo from "../components/Titulo"

const CookiesPage = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Titulo title="COOKIES" />

      <div className="mx-auto mt-4" style={{ maxWidth: "600px", width: "100%" }}>
        <div
          className="card"
          style={{
            backgroundColor: theme.cardColor,
            color: theme.textColor,
            border: `2px solid ${theme.borderColor}`,
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <div className="card-body d-flex flex-column fs-5">
            <p>
              <strong>Uso de cookies:</strong> Armand Events utiliza cookies para mejorar la
              experiencia del usuario dentro de la plataforma. Estas cookies permiten recordar
              preferencias, mantener sesiones iniciadas y optimizar la navegación.
            </p>

            <p>
              <strong>Tipos de cookies utilizadas:</strong>
              <br />- <strong>Cookies esenciales:</strong> Son necesarias para el funcionamiento
              básico de la plataforma, como el inicio de sesión y la navegación segura.
              <br />- <strong>Cookies de funcionalidad:</strong> Permiten recordar preferencias del
              usuario como idioma o configuración visual.
              <br />- <strong>Cookies de análisis:</strong> Nos ayudan a comprender cómo los
              usuarios interactúan con el sitio para mejorar la experiencia general.
            </p>

            <p>
              <strong>Control de cookies:</strong> El usuario puede desactivar o eliminar las
              cookies desde la configuración de su navegador. Sin embargo, algunas funciones de
              Armand Events podrían dejar de funcionar correctamente si se deshabilitan las cookies
              esenciales.
            </p>

            <p>
              <strong>Terceros:</strong> No utilizamos cookies de terceros con fines publicitarios.
              Solo se emplean herramientas de análisis básicas para mejorar el rendimiento de la
              plataforma.
            </p>

            <p>
              <strong>Modificaciones:</strong> La presente política de cookies podrá ser actualizada
              en cualquier momento. Cualquier cambio será publicado en esta misma página.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookiesPage

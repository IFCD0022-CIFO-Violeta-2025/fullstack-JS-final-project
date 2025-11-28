import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"
import Titulo from "../components/Titulo"

const PrivacidadPage = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Titulo title="PRIVACIDAD" />

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
              <strong>Recopilación de información:</strong> Armand Events puede recopilar datos
              proporcionados voluntariamente por los usuarios, tales como nombre, correo electrónico
              y número de identificación, con el fin de permitir el uso adecuado de la plataforma.
              También puede recopilar información técnica como dirección IP, tipo de dispositivo y
              datos de navegación para mejorar la experiencia.
            </p>

            <p>
              <strong>Uso de la información:</strong> Los datos recopilados se utilizan para
              gestionar eventos, mejorar la plataforma, permitir la comunicación entre organizadores
              y usuarios, y garantizar la seguridad y el correcto funcionamiento del servicio. En
              ningún caso se venderán los datos a terceros.
            </p>

            <p>
              <strong>Compartición de datos:</strong> La información personal podrá ser compartida
              únicamente con los organizadores de los eventos a los que el usuario se inscriba, y
              únicamente con el propósito de gestionar la asistencia y la organización. No se
              compartirá información con fines comerciales.
            </p>

            <p>
              <strong>Seguridad:</strong> Implementamos medidas para proteger la información
              personal, pero no podemos garantizar una seguridad absoluta debido a la naturaleza de
              los servicios en línea. Se recomienda a los usuarios proteger sus credenciales de
              acceso.
            </p>

            <p>
              <strong>Derechos del usuario:</strong> Los usuarios pueden solicitar la eliminación de
              su cuenta y la eliminación de sus datos personales en cualquier momento enviando un
              correo a <strong>ieiieie@gmail.com</strong>. También pueden solicitar correcciones o
              actualizaciones de su información.
            </p>

            <p>
              <strong>Modificaciones:</strong> Armand Events se reserva el derecho de actualizar
              esta política de privacidad en cualquier momento. Los cambios serán publicados en esta
              misma página.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacidadPage

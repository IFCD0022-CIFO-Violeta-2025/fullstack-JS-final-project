import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"
import Titulo from "../components/Titulo"

const NormativaPages = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Titulo title="NORMATIVA" />

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
              <strong>Registro:</strong> Los usuarios de Armand Events deberán registrarse con datos
              verídicos y mantener su información actualizada.
            </p>

            <p>
              <strong>Creación de eventos:</strong> Todo evento creado deberá ser autorizado por el
              administrador antes de publicarse. El organizador deberá aportar su número de
              documento de identidad y una forma de contacto válida, además de proporcionar toda la
              información solicitada en el formulario. También deberá mantener el evento actualizado
              y moderar el chat. En caso de cancelación, deberá avisar con suficiente antelación a
              los asistentes inscritos. Si un organizador aporta información falsa o el evento es
              inexistente, será expulsado permanentemente de la web.
            </p>

            <p>
              <strong>El evento y su chat:</strong> La comunicación tanto dentro del chat como en el
              evento físico debe ser respetuosa. El organizador actuará como moderador y podrá
              expulsar a usuarios por comportamiento indebido. Dichos usuarios también podrán ser
              expulsados permanentemente de la plataforma.
            </p>

            <p>
              <strong>El usuario:</strong> Todo usuario que se inscriba en tres eventos y no asista
              sin justificación será penalizado y no podrá inscribirse a nuevos eventos durante seis
              meses.
            </p>

            <p>
              <strong>Responsabilidad:</strong> Armand Events no es responsable de la organización
              ni de los problemas que puedan surgir durante un evento. El único responsable es el
              organizador.
            </p>

            <p>
              <strong>Denuncia de comportamiento indebido:</strong> Los usuarios pueden reportar
              cualquier incidencia o comportamiento inapropiado al administrador de la web
              escribiendo a: <strong>ieiieie@gmail.com</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NormativaPages

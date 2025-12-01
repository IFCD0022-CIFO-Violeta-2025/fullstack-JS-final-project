import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"
import Titulo from "../components/Titulo"
import logo from "/logo.png"

const WebHistoryPage = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {/*       <Titulo title="ARMAND EVENTS" /> */}
      <img src={logo} alt="logo Armand Events" width="200" height="200" className="mt-4" />

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
              Todo empezó con un curso de Fullstack con JavaScript. Nuestro profesor, Armand, como
              parte de nuestra formación, nos pidió realizar un proyecto grupal, y decidimos crear
              una página web de eventos con su nombre. Al principio nos limitamos a desarrollar lo
              básico, pero poco a poco el proyecto Armand Events fue creciendo y nos dimos cuenta de
              que podíamos construir una plataforma donde las personas pudieran conocerse a través
              de los eventos. Con esta intención incorporamos un chat de grupo, para que los
              participantes pudieran comunicarse antes de verse en persona, fomentando así una mayor
              familiaridad entre ellos. Además, dado que en muchas redes sociales hay personas que
              crean cuentas falsas para engañar a otros, quisimos diseñar una red social más segura.
              Por este motivo solicitamos el número de documento de identidad en el momento del
              registro. Esperamos que disfrutes de los eventos y conozcas a mucha gente!
            </p>
            <p>El Equipo de Armand Events</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebHistoryPage

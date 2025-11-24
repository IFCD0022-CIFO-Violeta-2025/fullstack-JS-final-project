import React, { useContext } from "react"
import Card from "../components/Card"
import Titulo from "../components/Titulo"
import { EventContext } from "../contexts/EventContext"

function HomePage() {
  const { eventos } = useContext(EventContext)

  return (
    <>
      <Titulo title="PUBLICACIONES" />

      <div className="row g-4 justify-content-center w-100">
        {eventos.length === 0 && <p>No hay eventos creados aún.</p>}

        {eventos.map((evento) => (
          <div
            key={evento.id}
            className="col-xxl-4 col-xl-6 col-md-6 col-sm-12"
          >
            <Card evento={evento} />
          </div>
        ))}
      </div>
    </>
  )
}

export default HomePage

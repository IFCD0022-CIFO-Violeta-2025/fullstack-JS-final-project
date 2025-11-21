import Card from "../components/Card"
import Titulo from "../components/Titulo"

import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { getJSON } from "../utils/apiclient"

function HomePage() {
  const { user } = useContext(AuthContext)
  const [privateItems, setPrivateItems] = useState(null)
  const [loadingPrivate, setLoadingPrivate] = useState(false)
  const [privateError, setPrivateError] = useState(null)

  useEffect(() => {
    if (!user) return
    // fetch protected content when user is logged
    setLoadingPrivate(true)
    setPrivateError(null)
    getJSON('api/protected/items')
      .then((data) => setPrivateItems(data))
      .catch((err) => setPrivateError(err.message || 'Error'))
      .finally(() => setLoadingPrivate(false))
  }, [user])

  return (
    <>
      <Titulo title="PUBLICACIONES" />
        <>
        {!user && (
          <div className="row m-4">
            <div className="col card pt-3">
              <p>Contenido público. <a href="/login">Inicia sesión</a> o <a href="/register">registrate</a> para ver contenido exclusivo.</p>
            </div>
          </div>
        )}
          <div className="row g-4  w-100">
            <div className="col-xxl-4 col-xl-6 col-md-6 col-sm-12">
              <Card />
            </div>
            <div className="col-xxl-4 col-xl-6 col-md-6 col-sm-12">
              <Card />
            </div>
            <div className="col-xxl-4 col-xl-6 col-md-6 col-sm-12">
              <Card />
            </div>
          </div>
        </>
    </>
  )
}

export default HomePage

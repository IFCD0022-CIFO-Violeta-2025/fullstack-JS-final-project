import Card from "../components/Card"
import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

function HomePage() {
  const { theme } = useContext(ThemeContext)

  return (
    <>
      <h1 className="text-center mt-4 mb-4" style={{ color: theme.titleColor }}>
        PUBLICACIONES
      </h1>

      <div className="row g-4 justify-content-center w-100">
        <div className="col-xxl-4 col-xl-6 col-md-6 col-sm-12">
          <Card />
        </div>
        <div className="col-xxl-4 col-xl-6 col-md-6 col-sm-12">
          <Card />
        </div>
        <div className="col-xxl-4 col-xl-6 col-md-6 col-sm-12">
          <Card />
        </div>
        <div className="col-xxl-4 col-xl-6 col-md-6 col-sm-12">
          <Card />
        </div>
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
  )
}

export default HomePage

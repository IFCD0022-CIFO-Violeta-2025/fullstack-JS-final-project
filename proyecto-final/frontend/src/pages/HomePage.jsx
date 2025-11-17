import Card from "../components/Card"
import Titulo from "../components/Titulo"

function HomePage() {
  return (
    <>
      <Titulo title="PUBLICACIONES" />

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

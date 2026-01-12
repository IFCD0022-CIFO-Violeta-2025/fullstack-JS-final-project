import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

const Titulo = ({ title }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <h1 className="text-center mt-4 mb-5" style={{ color: theme.titleColor }}>
      {title}
    </h1>
  )
}

export default Titulo

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Titulo from "../components/Titulo"
import { AuthContext } from "../contexts/AuthContext"
import { ThemeContext } from "../contexts/ThemeContext"

function LoginPage() {
  const { login } = useContext(AuthContext) // login del contexto
  const { theme } = useContext(ThemeContext) // para usar colores
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!username) {
      alert("Introduce un nombre de usuario")
      return
    }

    // Simulamos login
    login(username)
    navigate("/")
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "80vh",
        backgroundColor: theme.bodyColor,
        color: theme.textColor,
        padding: "2rem",
      }}
    >
      <div
        className="card shadow-sm"
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: theme.cardColor,
          color: theme.textColor,
          borderRadius: "8px",
        }}
      >
        <div className="card-body">
          <Titulo title="Login Page" />

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Introduce tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  backgroundColor: theme.bodyColor,
                  color: theme.textColor,
                  borderColor: theme.borderColor,
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Introduce tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: theme.bodyColor,
                  color: theme.textColor,
                  borderColor: theme.borderColor,
                }}
              />
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: theme.boton.base.backgroundColor,
                color: theme.boton.base.color,
                border: theme.boton.base.border,
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = theme.boton.hover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = theme.boton.base.backgroundColor)
              }
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

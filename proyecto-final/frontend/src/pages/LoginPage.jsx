import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Titulo from "../components/Titulo"
import { AuthContext } from "../contexts/AuthContext"
import { ThemeContext } from "../contexts/ThemeContext"
import { postJSON } from "../utils/apiclient"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import Boton from "../components/Boton"

function LoginPage() {
  // obtenemos la función login del contexto de autenticación
  const { login } = useContext(AuthContext)

  // obtenemos el theme para aplicar colores y estilos
  const { theme } = useContext(ThemeContext)

  // para navegar al Home después de loguear
  const navigate = useNavigate()

  // estado para inputs del formulario
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [passVisible, setPassVisible] = useState(false)
  // función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault()

    // limpiamos los errores
    // para que no se muestren en la siguiente renderizació
    // de la pantalla de login
    setErrors({})
    // validamos que el usuario haya escrito algo
    if (!username) {
      setErrors({ username: "El nombre de usuario es obligatorio" })
      return
    }
    if (username.length < 5) {
      setErrors({ username: "El nombre debe tener al menos 5 carácteres" })
      return
    }
    if (!password) {
      setErrors({ password: "La contraseña es obligatoria" })
      return
    }
    if (password.length < 5) {
      setErrors({ password: "La contraseña debe tener al menos 5 carácteres" })
      return
    }

    // mandamos el POST para el login
    const userLogin = async () => {
      try {
        const data = await postJSON("api/v1/users/login", { username, password })
        // respuesta esperada: { token, user } o { token, username }
        const jwt = data.token || data.jwt || null
        const userObj = data.user || (data.username ? { name: data.username } : null)
        if (jwt && userObj) {
          login(userObj, jwt)
          navigate("/")
        } else if (data.success && data.username) {
          // fallback para API sin token (dev mode)
          login({ name: data.username })
          navigate("/")
        } else {
          // no login
          setErrors({ general: "Credenciales inválidas" })
        }
      } catch (error) {
        console.error("Error en la solicitud POST de login : ", error)
        setErrors({ general: error.message || "Error de conexión" })
      }
    }
    userLogin()
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "80vh", // altura mínima para centrar verticalmente
        backgroundColor: theme.bodyColor,
        color: theme.textColor,
        padding: "2rem",
      }}
    >
      {/* card de login */}
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
          {/* título de la página */}
          <Titulo title="Inicio de sesión" />

          {/* formulario de login */}
          <form onSubmit={handleSubmit}>
            {/* input de usuario */}
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
                  backgroundColor: theme.dejarComentario,
                  color: "black",
                  borderColor: theme.borderColor,
                }}
              />
              {errors.username && <p className="error">❌ {errors.username}</p>}
            </div>

            {/* input de contraseña */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <div className="input-group">
                <input
                  type={passVisible ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Introduce tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    backgroundColor: theme.dejarComentario,
                    color: "black",
                    borderColor: theme.borderColor,
                  }}
                />
                <span
                  className="input-group-text"
                  style={{ backgroundColor: theme.dejarComentario, color: "black" }}
                >
                  {passVisible && <BsEye onClick={() => setPassVisible(!passVisible)} />}
                  {!passVisible && <BsEyeSlash onClick={() => setPassVisible(!passVisible)} />}
                </span>
              </div>
              {errors.password && <p className="error">❌ {errors.password}</p>}
            </div>

            {/* botón de submit */}
            {/*     <button
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
            </button> */}
            <Boton type="submit">Entrar</Boton>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

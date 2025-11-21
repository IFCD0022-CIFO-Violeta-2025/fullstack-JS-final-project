import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Titulo from "../components/Titulo"
import { AuthContext } from "../contexts/AuthContext"
import { ThemeContext } from "../contexts/ThemeContext"
import { postJSON } from "../utils/apiclient"

function LoginPage() {
  // 🔹 Obtenemos la función login del contexto de autenticación
  const { login } = useContext(AuthContext)

  // 🔹 Obtenemos el theme para aplicar colores y estilos
  const { theme } = useContext(ThemeContext)

  // 🔹 Para navegar al Home después de loguear
  const navigate = useNavigate()

  // 🔹 Estado para inputs del formulario
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})

  // 🔹 Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault()

    // 🔹 Limpiamos los errores
    // Para que no se muestren en la siguiente renderizació
    // de la pantalla de login
    setErrors({})
    // 🔹 Validamos que el usuario haya escrito algo
    if ( !username ) {
      setErrors({username: "El nombre de usuario es obligatorio"});
      return
    } 
    if (username.length < 5) {
      setErrors({username: "El nombre debe tener al menos 5 carácteres"});
      return
    }
    if ( !password ) {
      setErrors({password: "La contraseña es obligatoria"});
      return
    } 
    if (password.length < 5) {
      setErrors({password: "La contraseña debe tener al menos 5 carácteres"});
      return
    }

    // 🔹Mandamos el POST para el login
    const userLogin = async () => {
      try {
        const data = await postJSON('api/users/login', { username, password });
        // respuesta esperada: { token, user } o { token, username }
        const jwt = data.token || data.jwt || null
        const userObj = data.user || (data.username ? { name: data.username } : null)
        if (jwt && userObj) {
          login(userObj, jwt)
          navigate('/')
        } else if (data.success && data.username) {
          // fallback para API sin token (dev mode)
          login({ name: data.username })
          navigate('/')
        } else {
          // no login
          setErrors({ general: 'Credenciales inválidas' })
        }
      } catch (error) {
        console.error('Error en la solicitud POST de login : ', error);
        setErrors({ general: error.message || 'Error de conexión' })
      }
    }
    userLogin()
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "80vh", // 🔹 altura mínima para centrar verticalmente
        backgroundColor: theme.bodyColor,
        color: theme.textColor,
        padding: "2rem",
      }}
    >
      {/* 🔹 Card de login */}
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
          {/* 🔹 Título de la página */}
          <Titulo title="Login Page" />

          {/* 🔹 Formulario de login */}
          <form onSubmit={handleSubmit}>
            {/* 🔹 Input de usuario */}
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
              {errors.username && <p className="error">❌ {errors.username}</p>}
            </div>

            {/* 🔹 Input de contraseña */}
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
              {errors.password && <p className="error">❌ {errors.password}</p>}
            </div>

            {/* 🔹 Botón de submit */}
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

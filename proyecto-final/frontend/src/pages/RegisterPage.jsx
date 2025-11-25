import { useState, useContext, useEffect } from "react"
import Modal from "bootstrap/js/dist/modal"
import Titulo from "../components/Titulo"
import { ThemeContext } from "../contexts/ThemeContext"
import { AuthContext } from "../contexts/AuthContext"
import { postJSON } from "../utils/apiclient"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import OkModal from "../assets/modals/okModal"
import Boton from "../components/Boton"

function RegisterPage() {
  // obtenemos la función login del contexto de autenticación
  const { login } = useContext(AuthContext)

  // obtenemos el theme para aplicar colores y estilos
  const { theme } = useContext(ThemeContext)

  // para navegar al Home después de loguear
  //const navigate = useNavigate() pendiente modal y volver a home

  // estado para inputs del formulario
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState({})
  const [passVisible, setPassVisible] = useState(false)
  const [repeatPassVisible, setRepeatPassVisible] = useState(false)
  const [positiveRegistration, setPositiveRegistration] = useState(false)
  const [dataUser, setDataUser] = useState([])

  // mostrar el modal de éxito cuando `positiveRegistration` pase a true
  useEffect(() => {
    if (!positiveRegistration) return
    const el = document.getElementById("okModal")
    if (!el) return

    const modal = new Modal(el)
    const onHidden = () => setPositiveRegistration(false)
    el.addEventListener("hidden.bs.modal", onHidden)
    modal.show()
    return () => {
      el.removeEventListener("hidden.bs.modal", onHidden)
      try {
        modal.hide()
      } catch (e) {
        console.error(e)
      }
    }
  }, [positiveRegistration])

  // validación de email
  function validateEmail(email) {
    // regex básica para formato de correo
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(email)) {
      return false
    }
    return null // válido
  }

  // función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault()

    // limpiamos los errores
    // Para que no se muestren en la siguiente renderizació
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
    if (!repeatPassword || repeatPassword !== password) {
      setErrors({ repeatPassword: "Las contraseñas no coinciden" })
      return
    }

    // validamos que el usuario haya escrito algo
    if (!email) {
      setErrors({ email: "El correo es obligatorio" })
      return
    }
    if (validateEmail(email)) {
      setErrors({ email: "El correo no es valido" })
      return
    }

    // mandamos el POST para el login
    const userRegister = async () => {
      try {
        const fetchDataUser = await postJSON("api/v1/users/register", { username, password, email })
        setDataUser(fetchDataUser)
        // if API returns token and user, log the user in automatically
        const jwt = fetchDataUser?.token || fetchDataUser?.jwt || null
        const userObj =
          fetchDataUser?.user || (fetchDataUser?.username ? { name: fetchDataUser.username } : null)
        if (jwt && userObj) {
          login(userObj, jwt)
        }
        // backend returns created user object on success
        setUsername("")
        setPassword("")
        setRepeatPassword("")
        setEmail("")
        setPositiveRegistration(true)
      } catch (err) {
        console.error("Error en la solicitud POST de Register : ", err)
        // err is an Error enhanced by apiclient with properties: status, body, code, details
        if (
          err.code === "EMAIL_TAKEN" ||
          (err.status === 409 && err.body?.code === "EMAIL_TAKEN")
        ) {
          setErrors({ email: "El correo ya existe" })
        } else if (
          err.code === "USERNAME_TAKEN" ||
          (err.status === 409 && err.body?.code === "USERNAME_TAKEN")
        ) {
          setErrors({ username: "El nombre de usuario ya existe" })
        } else if (err.code === "VALIDATION_ERROR" || err.body?.code === "VALIDATION_ERROR") {
          // mapear detalles de Joi a errores por campo
          const details = err.details || err.body?.details || []
          const fieldErrors = {}
          details.forEach((d) => {
            const field = Array.isArray(d.path) ? d.path[0] : d.path
            fieldErrors[field] = d.message
          })
          setErrors(fieldErrors)
        } else if (err instanceof TypeError) {
          // network / CORS errors (fetch throws TypeError)
          setErrors({ general: "Error de red o CORS. Comprueba consola y configuración de CORS." })
        } else {
          setErrors({ general: err.message || "Error desconocido" })
        }
      }
    }
    userRegister()

    // redirigimos al Home
    //navigate("/")
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

          <Titulo title="Página de registro" />

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

            {/* input de repeat contraseña */}
            <div className="mb-3">
              <label htmlFor="repeatPassword" className="form-label">
                Repetir Contraseña
              </label>
              <div className="input-group">
                <input
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  type={repeatPassVisible ? "text" : "password"}
                  className="form-control"
                  id="repeatPassword"
                  placeholder="Repite tu contraseña"
                  style={{
                    backgroundColor: theme.dejarComentario,
                    color: "black",
                    borderColor: theme.borderColor,
                  }}
                />
                <span
                  className="input-group-text"
                  style={{ backgroundColor: theme.dejarComentario }}
                >
                  {repeatPassVisible && (
                    <BsEye onClick={() => setRepeatPassVisible(!repeatPassVisible)} />
                  )}
                  {!repeatPassVisible && (
                    <BsEyeSlash onClick={() => setRepeatPassVisible(!repeatPassVisible)} />
                  )}
                </span>
              </div>
            </div>
            {errors.repeatPassword && <p className="error">❌ {errors.repeatPassword}</p>}

            {/* input de correo */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Introduce tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: theme.dejarComentario,
                  color: "black",
                  borderColor: theme.borderColor,
                }}
              />
              {errors.email && <p className="error">❌ {errors.email}</p>}
              {errors.general && <p className="error">❌ {errors.general}</p>}
            </div>

            {/* botón de submit */}
            {/*       <button
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
            <Boton type="submit">Registrarse</Boton>
          </form>
        </div>
      </div>
      {positiveRegistration && (
        <OkModal
          title={
            dataUser?.username
              ? `${dataUser.username} se ha registrado con éxito`
              : "Registrado con éxito"
          }
          route="/login"
        />
      )}
    </div>
  )
}

export default RegisterPage

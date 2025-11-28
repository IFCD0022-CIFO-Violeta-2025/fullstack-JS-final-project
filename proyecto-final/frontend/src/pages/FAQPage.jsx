import { useContext } from "react"
import Titulo from "../components/Titulo"
import { ThemeContext } from "../contexts/ThemeContext"

function FAQPage() {
  const { theme, isDarkMode } = useContext(ThemeContext)

  // Lista de preguntas y respuestas ACTUALIZADAS
  const faqs = [
    {
      pregunta: "¿Cómo me registro en la página?",
      respuesta:
        "Deberás entrar en el enlace de login y ahí encontrarás la opción para registrarte.",
    },
    {
      pregunta: "¿Cómo me doy de baja?",
      respuesta: "En la página de tu perfil encontrarás un botón para darte de baja.",
    },
    {
      pregunta: "¿Por qué debemos poner el DNI al inscribirnos?",
      respuesta:
        "Porque Armand Event es una web dónde las personas registradas pueden estar seguros que es una web de confianza. Necesitamos el número de DNI para garantizar la seguridad de los usuarios y que no haya la posibilidad de crear varias cuentas por el mismo usuario, o que el usuario sea falso.",
    },
    {
      pregunta: "¿Cualquier persona puede inscribirse a los eventos?",
      respuesta: "Sólo las personas registradas pueden inscribirse a los eventos.",
    },
    {
      pregunta: "¿Cómo me inscribo a un evento?",
      respuesta:
        "En la página de eventos hay un botón para inscribirte, pero sólo podrás hacerlo si estás registrado como usuario.",
    },
    {
      pregunta: "¿Cualquier persona puede crear un evento?",
      respuesta:
        "Sólo las personas que hayan aportado su número de documento de identidad podrán crear eventos, para que sean responsables del mismo.",
    },
    {
      pregunta: "¿Los eventos son gratuitos?",
      respuesta: "Todos los eventos de la web son gratuitos.",
    },
    {
      pregunta: "¿Quién crea los eventos?",
      respuesta:
        "Los eventos los crea una persona que haya aportado su número de DNI, ya que tiene que responsabilizarse de estos.",
    },
    {
      pregunta: "¿Quién se hace responsable de los eventos?",
      respuesta: "El organizador del evento.",
    },
    {
      pregunta: "¿Por qué no puedo crear un evento?",
      respuesta: "Porque no has aportado tu número de DNI.",
    },
    {
      pregunta: "¿Por qué no aparece mi evento publicado?",
      respuesta:
        "Porque el administrador de la web aún no lo ha podido revisar, o tiene información indebida. Puedes ponerte en contacto con el administrador de la web y comentarle tu caso.",
    },
    {
      pregunta: "¿Los eventos creados son revisados antes de ser publicados?",
      respuesta: "Sí, deben ser revisados y autorizados por el administrador de la web.",
    },
    {
      pregunta: "¿Todos los eventos son autorizados?",
      respuesta: "No, si tienen información indebida o falsa.",
    },
    {
      pregunta: "¿Cómo puedo contactar con el organizador del evento?",
      respuesta: "En la página del evento verás su forma de contacto.",
    },
    {
      pregunta: "¿Hay una fecha límite para inscribirse en el evento?",
      respuesta: "Sí, la verás publicada en la página del evento.",
    },
    {
      pregunta: "¿Los eventos pueden ser de pago?",
      respuesta: "No, todos los eventos de Armand Events son gratuitos.",
    },
    {
      pregunta: "¿Puedo ir al evento con otras personas si no están inscritas?",
      respuesta:
        "No, todos los asistentes a los eventos deberán estar registrados y si lo están, cada uno tendrá que hacer la inscripción al evento de forma individual.",
    },
    {
      pregunta: "¿Qué pasa si no puedo asistir al evento?",
      respuesta:
        "Sé consciente que la persona que organiza el evento organiza sus actividades dependiendo del número de personas. Si por algún motivo no puedes asistir, deberás comunicarlo al organizador. También deberás darte de baja con el botón destinado para esto.",
    },
    {
      pregunta: "¿Qué pasa si no asisto al evento sin comunicarlo al administrador?",
      respuesta:
        "Si en tres ocasiones no asistes a los eventos a los que te has inscrito sin avisar o darte de baja, tendrás una penalización de seis meses, tiempo en el que no podrás inscribirte a ningún evento.",
    },
    {
      pregunta: "¿El evento se puede anular?",
      respuesta: "Sí, si no se ha inscrito el número mínimo de asistentes.",
    },
    {
      pregunta: "¿Cuánto tiempo estará activo el chat del grupo del evento?",
      respuesta:
        "El chat del grupo estará activo durante una semana después de haberse realizado el evento.",
    },
    {
      pregunta: "¿Por qué no puedo contactar por privado con un asistente al evento?",
      respuesta:
        "Es posible que ese asistente prefiera hablar de forma grupal y haya bloqueado esa opción para que le contacten.",
    },
    {
      pregunta: "¿Cómo puedo denunciar un mal comportamiento de un asistente al evento?",
      respuesta: "Puedes comunicarlo al administrador de la web escribiendo a iouououo@gmail.com",
    },
    {
      pregunta: "¿Me pueden expulsar de la web?",
      respuesta: "Sí, por un comportamiento no adecuado o por crear eventos falsos o inadecuados.",
    },
    {
      pregunta: "¿Cómo puedo contactar con el administrador de la web?",
      respuesta: "Puedes hacerlo escribiendo a iouououo@gmail.com",
    },
    {
      pregunta: "¿Qué cookies se utilizan?",
      respuesta:
        "Sólo las cookies técnicas. Verás en qué consiste en nuestro documento PDF, donde están explicadas la normativa de la página, la política de privacidad y la información sobre cookies.",
    },
    {
      pregunta: "¿Armand Events va a utilizar mi información con fines de marketing?",
      respuesta:
        "Nosotros nunca utilizaremos la información de los usuarios con fines de marketing, ni la trasladaremos a terceros.",
    },
  ]

  return (
    <div className="container my-4">
      <Titulo title="FAQ (Preguntas frecuentes)" />

      <div className="accordion" id="accordionFAQ">
        {faqs.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className={`accordion-button ${index !== 0 ? "collapsed" : ""} faq-button ${
                  isDarkMode ? "dark" : "light"
                }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded={index === 0 ? "true" : "false"}
                aria-controls={`collapse${index}`}
                style={{
                  backgroundColor: theme.cardColor,
                  color: theme.textColor,
                  fontSize: "1.6rem",
                }}
              >
                {faq.pregunta}
              </button>
            </h2>

            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
              data-bs-parent="#accordionFAQ"
            >
              <div
                className="accordion-body"
                style={{
                  backgroundColor: theme.bodyColor,
                  color: theme.textColor,
                  fontSize: "1.4rem",
                }}
              >
                {faq.respuesta}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQPage

import eventImg from "../assets/event.jpg"
import userAvatar from "../assets/user.jpg"

export const eventoMock = {
  titulo: "Festival de Música Urbana",
  descripcion: "Únete a nosotros para una noche llena de ritmo, talento local y buena vibra...",
  organizador: "Juan Pérez",
  contacto: "juan.perez@email.com",
  ubicacion: "Barcelona",
  fechas: ["2025-11-25", "2025-11-27"],
  horaInicio: "20:00",
  horaFin: "23:30",
  asistentesMin: 20,
  asistentesMax: 200,
  inscritos: 57,
  categorias: ["Música", "Cultura", "Danza", "Teatro"],
  usuario: {
    nombre: "Juan Pérez",
    avatar: userAvatar,
    fechaPublicacion: "2025-11-01",
  },
  comentarios: [
    { usuario: "Sandra", mensaje: "¡Qué ganas de que llegue el evento!" },
    { usuario: "Francisco", mensaje: "Me apunto!" },
    { usuario: "Diego", mensaje: "Alguien sabe si venderán cerveza? es para un amigo..." },
  ],
  img: eventImg,

  likes: 120,
  commentsCount: 45,
}

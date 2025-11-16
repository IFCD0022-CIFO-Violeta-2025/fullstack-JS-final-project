import eventImg from "../assets/event.jpg"
import userAvatar from "../assets/user.jpg"

export const eventoMock = {
  titulo: "Festival de Música Urbana",
  descripcion:
    "Únete a nosotros para una noche llena de ritmo, talento local y buena vibra. Disfruta de actuaciones en vivo de artistas emergentes y reconocidos, con estilos que van desde el hip hop y el reguetón hasta fusiones innovadoras de música electrónica y danza urbana. Habrá espacios interactivos para el público, food trucks con gastronomía internacional, y zonas chill-out para relajarse entre concierto y concierto. Este festival busca crear una experiencia única donde la música, la cultura y la comunidad se encuentren en un mismo lugar, celebrando la diversidad y la creatividad de la escena urbana.",
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
    {
      usuario: "Sandra",
      mensaje: "¡Qué ganas de que llegue el evento!",
      hora: "2025-11-10 18:45",
      likes: 3,
    },
    { usuario: "Francisco", mensaje: "Me apunto!", hora: "2025-11-11 09:20", likes: 5 },
    {
      usuario: "Diego",
      mensaje: "Alguien sabe si venderán cerveza? es para un amigo...",
      hora: "2025-11-12 14:05",
      likes: 2,
    },
  ],
  img: eventImg,

  likes: 120,
  commentsCount: 45,
}

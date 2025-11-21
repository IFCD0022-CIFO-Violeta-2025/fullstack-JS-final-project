import eventImg from "../assets/event.jpg"
import userAvatar from "../assets/user.jpg"

export const eventoList = [
  {
    titulo: "Festival de Música Urbana",
    descripcion:
      "Únete a nosotros para una noche llena de ritmo, talento local y buena vibra. Disfruta de actuaciones en vivo de artistas emergentes y reconocidos.",
    organizador: "Juan Pérez",
    contacto: "juan.perez@email.com",
    ubicacion: "Barcelona",
    fechas: ["2025-11-25", "2025-11-27"],
    horaInicio: "20:00",
    horaFin: "23:30",
    asistentesMin: 20,
    asistentesMax: 200,
    inscritos: 57,
    categorias: ["Música", "Cultura", "Danza"],
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
        mensaje: "¿Habrá cerveza? Es para un amigo...",
        hora: "2025-11-12 14:05",
        likes: 2,
      },
    ],
    img: eventImg,
    likes: 120,
    commentsCount: 45,
    fechaLimiteReserva: "2025-11-20",
    recordatorio2diasAntes: true,
  },

  {
    titulo: "Concierto de Rock Clásico",
    descripcion:
      "Revive los mejores éxitos del rock con un show inolvidable. Guitarras, solos épicos y más.",
    organizador: "Ana Gómez",
    contacto: "ana.gomez@email.com",
    ubicacion: "Madrid",
    fechas: ["2025-12-05"],
    horaInicio: "21:00",
    horaFin: "23:00",
    asistentesMin: 10,
    asistentesMax: 150,
    inscritos: 34,
    categorias: ["Música", "Rock"],
    usuario: {
      nombre: "Ana Gómez",
      avatar: userAvatar,
      fechaPublicacion: "2025-10-15",
    },
    comentarios: [],
    img: eventImg,
    likes: 85,
    commentsCount: 12,
    fechaLimiteReserva: "2025-12-01",
    recordatorio2diasAntes: false,
  },

  {
    titulo: "Feria Gastronómica Internacional",
    descripcion:
      "Sabores del mundo reunidos en un solo lugar. Platos, bebidas y postres internacionales.",
    organizador: "Carlos Ruiz",
    contacto: "carlos.ruiz@email.com",
    ubicacion: "Valencia",
    fechas: ["2025-09-10", "2025-09-12"],
    horaInicio: "12:00",
    horaFin: "22:00",
    asistentesMin: 50,
    asistentesMax: 500,
    inscritos: 140,
    categorias: ["Gastronomía", "Cultura"],
    usuario: {
      nombre: "Carlos Ruiz",
      avatar: userAvatar,
      fechaPublicacion: "2025-08-20",
    },
    comentarios: [],
    img: eventImg,
    likes: 210,
    commentsCount: 52,
    fechaLimiteReserva: "2025-09-05",
    recordatorio2diasAntes: true,
  },
]

// Para compatibilidad con tu código previo:
export const eventoMock = eventoList[0]
import express from "express"
import { createServer } from "node:http"
import { Server } from "socket.io"

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React (Vite)
    methods: ["GET", "POST"],
  },
})

// Ruta simple para probar
app.get("/", (req, res) => {
  res.send("Servidor Socket.IO funcionando")
})

// Conexión Socket.IO
io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado")

  // Recibir mensaje completo
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg) // reenviar a todos
    console.log("Mensaje recibido:", msg)
  })

  socket.on("disconnect", () => {
    console.log("Usuario desconectado")
  })
})

// Servidor
server.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000")
})

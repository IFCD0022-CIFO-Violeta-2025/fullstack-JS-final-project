import express from "express"
import { createServer } from "node:http"
import { Server } from "socket.io" // ← ESTA ERA LA IMPORTANTE

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React (Vite)
    methods: ["GET", "POST"],
  },
})

app.get("/", (req, res) => {
  res.send("Servidor Socket.IO funcionando")
})

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado")

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg)
    console.log("Mensaje:", msg)
  })

  socket.on("disconnect", () => {
    console.log("Usuario desconectado")
  })
})

server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000")
})

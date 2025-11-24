import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    // Permitir todos los orígenes para pruebas (incluye Postman web).
    // Para producción restringir a los orígenes necesarios.
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Ruta simple para probar
app.get("/", (req, res) => {
  res.send("Servidor Socket.IO funcionando");
});

// Conexión Socket.IO
io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");

  // Recibir mensaje completo
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // reenviar a todos
    console.log("Mensaje recibido:", msg);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

// Servidor
server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
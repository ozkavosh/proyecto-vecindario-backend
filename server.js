//Server
const express = require("express");
const app = express();
const http = require("http");
const _ = require("lodash");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://vecindario.vercel.app", /https:\/\/vecindario-.*-ozkavosh.vercel.app/],
    methods: ["GET", "POST"],
  },
});

//Config
const cors = require("cors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8080;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

//Events
app.on("error", (err) => console.error);

const users = {};

io.on("connection", (socket) => {
  const uid = socket.handshake.query.uid;
  
  if(!uid) socket.disconnect();
  if(!users[uid]) users[uid] = [];

  users[uid].push(socket.id);

  io.sockets.emit('connectedUsers', Object.keys(users));

  console.log(users)

  socket.on("disconnect", () => {
    _.remove(users[uid], (u) => u === socket.id);
    console.log("Se desconecto un usuario!");
    if (users[uid].length === 0) {
      delete users[uid];
    }
    console.log(users)
    io.sockets.emit('connectedUsers', Object.keys(users));

    socket.disconnect();
  })
});

server.listen(PORT, () => {
  console.log(
    `Servidor listo y escuchando en el puerto ${server.address().port}`
  );
});

require("dotenv").config();
const express = require("express");

const enrutador = require("./routers");
const usuariosRouter = require("./routers/usuarios"); // Importa el archivo usuarios.js

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", enrutador);
app.use("/api/pruebausuarios", usuariosRouter); // Asocia las peticiones a usuarios.js

app.get("/", (req, res) => {
  res.send("API REST Estructurada por capas");
});

module.exports = app;
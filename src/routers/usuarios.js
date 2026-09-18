//agrupa las rutas de mi app 
const {Router} = require("express")
const enrutador = Router()
const mostrarUsuarios = require("../controller/PruebaUsuarios")

enrutador.get("/mostrarUsuarios", mostrarUsuarios);
//ejemplo
//enrutador.use("/usuarios", usuariosRouter)

module.exports = enrutador;
//agrega las rutas de mi aplicacion (usuario, productos, notas)
const {Router} = require ("express")
const enrutador = Router ()
const prueba = require ("./pruebaRouter")



enrutador.use("/rutaPrueba", prueba)
//ejemplo
//enrutador.use("/usuarios", usuariosRouter)


module.exports = enrutador
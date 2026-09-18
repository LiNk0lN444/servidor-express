//Ruta de solo prueba
const {Router} = require ("express")
const enrutador = Router ()
const mostrarRuta = require ("../controllers/rutaPruebaController")


//funcion req y res debe ir en el controlador
enrutador.get("/rutaPersonal", mostrarRuta)




module.exports = enrutador
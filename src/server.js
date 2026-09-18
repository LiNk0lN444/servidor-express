//importar mi apliacion app
const app = require("./app")

//verificar puerto de las variables de entorno 
const PUERTO = process.env.PUERTO || 3333


// Imprimo por consola el link del servidor 
app.listen(PUERTO,()=>{
    console.log(`mi servdior: http://localhost:${PUERTO}`)
})
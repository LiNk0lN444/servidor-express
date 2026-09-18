const manejadorErrores =(error, req,res,next)=>{
    const codigoEstado = error.statusCode || 500
    const mensaje = error.message || "Erro inesperado !!"
    console.error(`[ERROR] - ${new Date().toISOString()} - $
    {codigoEstado} - ${mensaje}`)
    //validar si hay mas informacion
    if (error.stack){ 
        console.error(error.stack)
    }
    //respuesta en json
    res.json({
        Error : "ERROR", codigoEstado, mensaje,
        //dependencia si estamos en desarrollo o produccion
        ...(process.env.NODE_ENV === "development" && {stack: error.stack})
    })


}


module.exports = manejadorErrores
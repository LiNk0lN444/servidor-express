const jsonwebtoken = require('jsonwebtoken');
const autenticacion =(req,res,next)=>{
    //requerir //
    const token = req.header("autenticar")?.split(" ")[1]
    if (!token){
        res.status(401).json({Error:"acceso denegado, no provee token." })
    }
    //verificar con nuestra frase secreta//
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (error,usuario) => {
        if(error){
            res.status(403).json({Error:"Token invalido." })
        }
        req.usuario = usuario
        next()
    })
}

module.exports = autenticacion 
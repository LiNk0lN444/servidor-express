const registroMiddleware = (req, res, next) => {
    const fecha = new Date().toISOString();
    console.log(`Historial de peticiones] ${fecha}, ${req.method}, ${req.url}, ${req.ip}`);
    next();

}




module.exports = registroMiddleware
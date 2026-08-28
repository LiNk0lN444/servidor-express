const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send('Api rest aprendices');
});

//middleware para recibir datos en formato json
app.use(express.json());
app.use(express.urlencoded({extended:true})); //para recibir datos de formularios

//lista de aprendices
app.get("/api/aprendices", (req, res) => {
    res.status(200).json({
        "mensaje":"Lista de aprendices",
    });
});
//listar un aprendiz 
app.get("/api/aprendices/:id", (req, res) => {
    res.status(200).json({
        "mensaje":"Lista 1 aprendiz",
    });
});

//empoindt crear aprendiz
app.post("/api/aprendices/", (req, res) => {
    res.status(201).json({
        "mensaje":"crear aprendices",
    });
});

//empoindt editar aprendiz
app.put("/api/aprendices/:id", (req, res) => {
    res.status(201).json({
        "mensaje":"editar aprendices",
    });
});

//empoindt eliminar aprendiz
app.delete("/api/aprendices/:id", (req, res) => {
    res.status(200).json({
        "mensaje":"eliminar aprendices",
    });
});

app.post("/rutaJson",(req, res)=>{
    const todosDatos = req.body;
    const edad = req.body.edad2
    if (edad>=18) {
        res.json({mensaje:"Eres mayor de edad"})
    } else {
        res.json({mensaje:"Eres menor de edad"})
    }
    res.json({datoJson:todosDatos})
});

app.post("/rutaFormulario",(req, res)=>{
    const todosDatos = req.body;
    const programa = req.body.programa
    res.json({todosDatos: todosDatos, Miprograma: programa})
});



app.listen(port, () => {
    console.log( `Servidor :http://localhost:${port}` );
});
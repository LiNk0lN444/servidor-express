const express = require('express');
const app = express();


require('dotenv').config();

const port = process.env.PORT || 3030;
const jwt= require("jsonwebtoken")

const registroMiddleware = require("./middleware/registroMiddleware");
const manejadorErrores = require("./middleware/manejadorErrores");
const autenticacion =require("./middleware/autenticacion")

// Middlewares para parsear el body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para mostrar tiempo y fecha
app.use((req, res, next) => {
  console.log(`Tiempo milisegundos: ${Date.now()}`);
  console.log(`Fecha: ${new Date().toISOString()}`);
  next();
});

app.use(registroMiddleware);

// Módulos para manejo de archivos
const sistemaArchivo = require('fs');
const ruta = require('path');

const rutaArchivo = ruta.join(__dirname, 'datos.json');

const multer = require('multer');
const { json } = require('stream/consumers');

// Configuración de almacenamiento de imágenes
const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'misImagenes/');
  },

  filename: (req, file, cb) => {
    const extension = ruta.extname(file.originalname);
    cb(null, `${Date.now()}${extension}`);
  }
});

const cargar = multer({ storage: almacenamiento });

// Ruta principal
app.get("/", (req, res) => {
  res.send('API REST APRENDICES');
});

// Endpoint para listar aprendices
app.get("/api/aprendices", (req, res) => {
  sistemaArchivo.readFile(rutaArchivo, 'utf-8', (error, datos) => {

    if (error) {
      return res.status(500).json({
        mensaje: "Error al leer el archivo"
      });
    }

    const listaAprendices = JSON.parse(datos);

    res.status(200).json({
      mensaje: listaAprendices
    });
  });
});

// Endpoint para listar un aprendiz por ID
app.get("/api/aprendices/:id", (req, res) => {

  res.status(200).json({
    mensaje: "Lista de un aprendiz",
    id: req.params.id
  });

});

// Endpoint para crear un aprendiz con imagen
app.post("/api/aprendices", cargar.single('imagen'), (req, res) => {

  const nuevoAprendiz = req.body;

  // Agregar la ruta de la imagen
  nuevoAprendiz.imagen = req.file
    ? `/misImagenes/${req.file.filename}`
    : "sin imagen";

  // Leer archivo y agregar un nuevo aprendiz
  sistemaArchivo.readFile(rutaArchivo, 'utf-8', (error, datos) => {

    if (error) {
      return res.status(500).json({
        mensaje: "Error al leer el archivo"
      });
    }

    const listaAprendices = JSON.parse(datos);

    // Agregar el nuevo aprendiz al arreglo
    listaAprendices.push(nuevoAprendiz);

    // Guardar nuevamente el archivo
    sistemaArchivo.writeFile(
      rutaArchivo,
      JSON.stringify(listaAprendices, null, 2),
      (error) => {

        if (error) {
          return res.status(500).json({
            mensaje: "No se puede escribir en el archivo o BD"
          });
        }

        res.status(201).json({
          mensaje: "Aprendiz creado",
          "datos aprendiz": nuevoAprendiz
        });
      }
    );
  });
});

// Endpoint para actualizar un aprendiz
app.put("/api/aprendices/:id", (req, res) => {

  res.status(200).json({
    mensaje: "Actualizar aprendiz",
    id: req.params.id
  });

});

// Endpoint para eliminar aprendiz
app.delete("/api/aprendices/:id", (req, res) => {

  res.status(200).json({
    mensaje: "Eliminar aprendiz",
    id: req.params.id
  });

}); // <-- ESTE CIERRE FALTABA

// Ruta para probar el manejador de errores
app.get("/error", (req, res, next) => {

  next(new Error("Error intencional de mi app"));

});

app.get("/api/rutaprotegida",autenticacion,(req,res)=>{
    res.status(200).json({mensaje:"Esta es mi ruta protegida |||"})
})
app.post("/api/login", (req, res) => {

    const usuarioBd = {
        usuario: "Lincoln",
        clave: "cas123"
    };

    const { usuario, clave } = req.body;

    if (usuario !== usuarioBd.usuario || clave !== usuarioBd.clave) {
        return res.status(400).json({
            mensaje: "Credenciales no validas"
        });
    }

    const token = jwt.sign(
        { usuario },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
});

// Middleware para manejar errores
app.use(manejadorErrores);


// Iniciar servidor
app.listen(port, () => {
  console.log(`SERVIDOR: http://localhost:${port}`);
});
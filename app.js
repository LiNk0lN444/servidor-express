import express from "express";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const port = process.env.PUERTO || 3000;

app.get("/", (_, res) => {
    res.send("Aprendices ficha 3407186 SENA");
});

// Endpoint 1
app.get("/ruta1", (req, res) => {
    res.send("<h1>Usando res.send</h1>");
});

// Endpoint 2
app.get("/ruta2", (req, res) => {
    res.json({
        dev: "node --watch app.js",
        script: "node app.js"
    });
});

// Endpoint 3
app.get("/ruta3/:nombre/:apellido", (req, res) => {
    const nameUsuario = req.params.nombre;
    const nameApellido = req.params.apellido;

    res.json({
        usuario: nameUsuario,
        apellido: nameApellido
    });
});

// Endpoint 4
app.get("/ruta4", (req, res) => {
    const numero = req.query.phone || 3163601029;
    const orden = req.query.orden || "sin orden"
    const pagina = req.query.pagina || 1
    res.send(`
        <h1>Listado de Aprendices</h1>
        <h2>El listado en orden: ${orden} </h2>
        <p>pagina: ${pagina}</p>
        <h3>Número: ${numero}</h3>
    `);
});

app.get("/ruta5/:nombre", (req, res) => {
    const { nombre } = req.params;

    if (nombre.length < 3) {
        return res.status(400).send("Error: el nombre debe tener al menos 3 letras");
    }

    res.send(`Hola, ${nombre}, bienvenido`);
});

app.get("/ruta6/:nombre", (req, res) => {
    const { nombre } = req.params;

    res.json({
        id: 1,
        nombre,
        stock: 20,
        precio: 45000,
        categoria: "Tecnología"
    });
});

app.get("/ruta7/:categoria/:id", (req, res) => {
    const { categoria, id } = req.params;

    res.json({
        servidor: "Express",
        categoria,
        producto: id
    });
});

app.get("/ruta8/:id/posts", (req, res) => {
    const { id } = req.params;
    const orden = req.query.orden || "asc";

    let publicaciones = [
        "Publicación 1",
        "Publicación 2",
        "Publicación 3"
    ];

    if (orden === "desc") {
        publicaciones.reverse();
    }

    res.json({
        usuario: id,
        orden,
        publicaciones
    });
});

app.get("/ruta9/:id/:posts_id/comentarios", (req, res) => {
    const { id, posts_id } = req.params;
    const orden = req.query.orden || "asc";

    let comentarios = [
        "Comentario 1",
        "Comentario 2",
        "Comentario 3"
    ];

    if (orden === "desc") {
        comentarios.reverse();
    }

    res.json({
        usuario: id,
        post: posts_id,
        orden,
        comentarios
    });
});

const libros = [
    {
        isbn: "111",
        titulo: "Clean Code",
        autor: "Robert C. Martin"
    },
    {
        isbn: "222",
        titulo: "JavaScript",
        autor: "Douglas Crockford"
    },
    {
        isbn: "333",
        titulo: "Node.js",
        autor: "Ryan Dahl"
    }
];

app.get("/ruta10/:isbn", (req, res) => {
    const { isbn } = req.params;

    const libro = libros.find(libro => libro.isbn === isbn);

    if (!libro) {
        return res.status(404).send("Libro no encontrado");
    }

    res.json(libro);
});

app.listen(port, () => {
    console.log(`SERVIDOR: http://localhost:${port}`);
});
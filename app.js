const express = require('express');
const app = express();
const port = 3000; 


app.get("/", (_, res) => { res.send('Aprendicez ficha 3407186'); });


app.listen(port, () => { console.log( `Servidor en funcionamiento en el puerto: `); }); 
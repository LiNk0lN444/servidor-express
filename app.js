import express from 'express';  
import {configDotenv} from "dotenv" 
configDotenv()

const app = express();  
const port = process.env.PUESTO || 3000; 
app.get("/", (_, res) => { 
    res.send('Aprendicez ficha 3407186'); 
});
app.listen(port, () => { 
    console.log( `SERVIDOR: http://localhost:${port}`); 
}); 

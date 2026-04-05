import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import { pasteRouter } from "./routes/paste.js";

const port = Number(process.env.PORT) || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");

const app = express();



app.use(express.json());


app.use('/api',pasteRouter)

app.use(express.static(appRoot))

app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:appRoot})
})

app.get('/:codename',(req,res)=>{
    res.sendFile('view.html',{root:appRoot})
})

if (process.env.VERCEL !== '1') {
    app.listen(port,()=>{
        console.log('server is up and running on port : ', port)
    })
}

export default app;
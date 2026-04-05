import express from "express";
import "dotenv/config";
import path from "path";
import { pasteRouter } from "./routes/paste.js";

const port = Number(process.env.PORT) || 3000;
const frontendDir = path.join(process.cwd(), "frontend");

const app = express();



app.use(express.json());


app.use('/api',pasteRouter)

app.use(express.static(frontendDir))

app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:frontendDir})
})

app.get('/:codename',(req,res)=>{
    res.sendFile('view.html',{root:frontendDir})
})

if (process.env.VERCEL !== '1') {
    app.listen(port,()=>{
        console.log('server is up and running on port : ', port)
    })
}

export default app;
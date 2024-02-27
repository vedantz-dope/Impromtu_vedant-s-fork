import express from "express";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = 8000;

app.use('/static',express.static('static'));
app.set('view engine', 'pug');
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send('Connect This Page to the Index.pug in Views/Index.pug');
});

app.listen(port, ()=>{
    console.log(`Application Started in Development Phase on you Localhost at Port:${8000}`);
});
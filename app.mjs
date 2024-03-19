import express from "express";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import session from "express-session";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import generateRandomSequence from "./generateRandomSessionId.mjs";
const app = express();
const port = 8000;

import mongoose from "mongoose";
mongoose.connect(`mongodb://127.0.0.1:27017/Impromptu`,{
    useNewUrlParser:true, 
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection Succeded");
}).catch((err)=>{
    console.log(err);
});

const userDataSchema = new mongoose.Schema({
    UserName: String,
    Password: String
});
const userData = new mongoose.model('userData',userDataSchema);


app.use('/static',express.static('static'));
app.set('view engine', 'pug');
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: true }));


const oneDay = 60*60*24*1000;
function genid(req) {
    return uuidv4();
}
app.use(session({
    genid: genid,
    secret: 'dGhpc2lzdGhlc2VjcmV0a2V5ZG9udHNoYXJld2l0aGFueW9uZQo=',
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}));


app.get('/',(req,res)=>{
    res.status(200).render('login.pug');
});

app.post('/',(req,res)=>{
    let userDataObject = {
        UserName : req.body.UserName,
        Password : req.body.Password
    };
    let body = new userData(userDataObject);
    body.save().then(()=>{
        console.log("Item Saved To Database");
        res.status(200).redirect("/user");
    });
});

app.get('/user',(req,res)=>{
    res.status(200).render('index.pug') 
})

app.listen(port, ()=>{
    console.log(`Application Started in Development Phase on you Localhost at Port:${port}`);
});
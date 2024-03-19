import express from "express";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
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
    UserName : String,
    Password : String
})

const userData = new mongoose.model('UserLoginData',userDataSchema);

const userInfoSchema = new mongoose.Schema({
    MobileNumber: Number,
    FullName: String,
    Username: String,
    Password: String
});

const Userinfo = new mongoose.model('UserInfoData',userInfoSchema);

app.use('/static',express.static('static'));
app.set('view engine', 'pug');
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: true }));

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

app.get('/signup',(req,res)=>{
    res.status(200).render('signup.pug')
})


app.post('/signup',(req,res)=>{
    let userDataObject = {
        MobileNumber : req.body.MobileNumber,
        FullName : req.body.FullName,
        UserName : req.body.UserName,
        Password : req.body.Password
    };
    let body = new Userinfo(userDataObject);
    body.save().then(()=>{
        console.log("Item Saved To Database");
        res.status(200).redirect("/user");
    });
} )

app.listen(port, ()=>{
    console.log(`Application Started in Development Phase on you Localhost at Port:${port}`);
});


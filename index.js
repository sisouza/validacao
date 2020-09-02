const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const app = express()
const session = require("express-session")
const flash = require("express-flash")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

//set cookie parser
app.use(cookieParser("agsdhh"))



app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

app.use(flash())

app.get("/",(req,res) =>{
    res.render("index")
})

//form router

app.post("/form",(req,res) =>{
    let {email,name,pontos} = req.body

    let emailError;
    let pontosError;
    let nameError;

    //validations
    if(email == undefined || email == ""){
        emailError = "Email não pode ser vazio"
    }

    if(pontos == undefined || pontos < 20){
        pontosError = "Voce não pode ter menos de 20 pontos"
    }

    if(name == undefined || name == ""){
        nameError = "Nome não pode ser vazio"
    }

    if(name.lenght < 4){
        nameError = "O nome não pode ter menos de 4 caracteres"
    }

    //checking errors 
    if(emailError != undefined || pontosError != undefined || nameError != undefined   ){
        res.redirect("/")
    }else{
        res.send("Formulario okay")
    }
})

app.listen(8080,(req,res) =>{
    console.log("Executing...")
})
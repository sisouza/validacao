const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const app = express()
const flash = require("express-flash")
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


    //acessing flash sessions
    let emailError = req.flash("emailError")
    let pontosError = req.flash("pontosError")
    let nameError = req.flash("nameError")
    let email = req.flash("email")

    //avoiding empty errors on the screen
    emailError = (emailError == undefined || emailError.lenght == 0) ? undefined : emailError
    email = (email== undefined || email.lenght == 0) ? undefined : email

    res.render("index",{emailError,pontosError,nameError,email:email})
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
        
        //setting flash sessions for errors
        req.flash("emailError",emailError)
        req.flash("pontosError",pontosError)
        req.flash("nameError",nameError)
        req.flash("email",email)

        res.redirect("/")
    }else{
        res.send("Formulario okay")
    }
})

app.listen(8080,(req,res) =>{
    console.log("Executing...")
})
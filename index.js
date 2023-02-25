const express = require('express')
const app = express()
const path = require('path')
const passport = require('passport')
var session = require('express-session')


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    })
)

app.use(passport.authenticate('session'));

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

const publicRouter = require('./routes/publicRoute')

app.use('/',publicRouter)

app.listen('3000', function(){
    console.log('Funcionando na porta 3000')
})


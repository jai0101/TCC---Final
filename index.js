const express = require('express')
const app = express()
const path = require('path')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

const publicRouter = require('./routes/publicRoute')

app.use('/',publicRouter)

app.listen('3000', function(){
    console.log('Funcionando na porta 3000')
})


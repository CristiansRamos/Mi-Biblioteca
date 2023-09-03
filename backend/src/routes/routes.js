const express= require('express');

const coneccion = require('../database/bd')

const router = express();


router.get('/', (req , res)=>{
    res.send('<h1>esta es la ruta de inicio</h1>')
})

/* app.post('/saludo', (req , res)=>{
    res.send('<h1>hola como estan?</h1>')
})

app.get('/input', (req , res)=>{
    res.send('<h1>Este es un input </h1> <input type="text"></input>')
}) */

module.exports = router;
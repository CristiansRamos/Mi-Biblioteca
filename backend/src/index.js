const express= require('express');
const app = express();

const morgan = require('morgan');

const coneccion = require('./database/bd')

app.set('puerto', 2023);
app.use(morgan('dev'));

app.get('/', (req , res)=>{
    res.send('<h1>hola mundo</h1>')
})

app.post('/saludo', (req , res)=>{
    res.send('<h1>hola como estan?</h1>')
})

app.get('/input', (req , res)=>{
    res.send('<h1>Este es un input </h1> <input type="text"></input>')
})

app.listen(app.get('puerto'), ()=>{
    console.log('mi servidor esta corriendo en el puerto', app.get('puerto'))
})
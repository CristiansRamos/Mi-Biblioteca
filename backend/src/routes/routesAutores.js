const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()



router.get('/Autores', (req , res)=>{
    mysqlConnect.query('SELECT a.id_autor, a.nombre, e.nombre AS editorial FROM autores AS a INNER JOIN editorial AS e ON e.id_editorial=a.id_editorial', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

module.exports= router;
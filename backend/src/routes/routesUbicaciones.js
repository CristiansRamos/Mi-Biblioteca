const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()

//////////LISTAR UBICACIONES//////

router.get('/ubicaciones',(req , res)=>{
    mysqlConnect.query('SELECT * FROM ubicaciones', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
            }
        })
    })

    /////////////AGREGAR UBICACIONES/////////
router.post('/ubicaciones', bodyParser.json(), (req , res)=>{
    const { nombre }  = req.body
  
    mysqlConnect.query('INSERT INTO ubicaciones (nombre) VALUES (?)', [nombre], (error, registros)=>{
       if(error){
           console.log('Error en la base de datos', error)
       }else{
            res.json({
            status:true,
            mensaje: "Se Agregó correctamente"
            })
       }
   })
})

module.exports= router;
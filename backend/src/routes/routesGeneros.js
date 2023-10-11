const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()

//////////LISTAR GENEROS//////

router.get('/generos',(req , res)=>{
    mysqlConnect.query('SELECT * FROM generos', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
            }
        })
    })

    ////////////TRAER DATOS DE GENEROS POR ID//////////
router.get('/generos/:id_generos', (req , res)=>{
    const { id_genero } = req.params
    mysqlConnect.query('SELECT * FROM generos WHERE id_genero=?', [id_genero], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

    /////////////AGREGAR GENEROS/////////
router.post('/generos', bodyParser.json(), (req , res)=>{
    const { nombre }  = req.body
  
    mysqlConnect.query('INSERT INTO generos (nombre) VALUES (?)', [nombre], (error, registros)=>{
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
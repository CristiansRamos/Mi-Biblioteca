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
    ////////////ELIMINAR UBICACION///////
    router.delete('/ubicaciones/:id_ubicacion', bodyParser.json(), (req , res)=>{
        const { id_ubicacion } = req.params
        mysqlConnect.query('DELETE FROM ubicaciones WHERE id_ubicacion = ?', id_ubicacion, (error, registros)=>{
           if(error){           
                res.json({
                status:false,
                mensaje: error
            })
           }else{
             res.json({
                status:true,
                mensaje: 'La eliminacion del registro ' +id_ubicacion+ ' se realizo correctamente'
            })
           }
       })
    })

module.exports= router;
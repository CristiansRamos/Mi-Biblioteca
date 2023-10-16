const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()



//////////LISTAR EDITORIALES//////

router.get('/editorial',(req , res)=>{
    mysqlConnect.query('SELECT * FROM editorial', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
            }
        })
    })

    /////////////AGREGAR EDITORIAL/////////
router.post('/editorial', bodyParser.json(), (req , res)=>{
    const { nombre }  = req.body
  
    mysqlConnect.query('INSERT INTO editorial (nombre) VALUES (?)', [nombre], (error, registros)=>{
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

////////////TRAER DATOS DE EDITORIAL POR ID//////////
router.get('/editorial/:id_editorial', (req , res)=>{
    const { id_editorial } = req.params
    mysqlConnect.query('SELECT * FROM editorial WHERE id_editorial=?', [id_editorial], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

////////////CAMBIAR ESTADO EDITORIAL/////////
router.post('/editorial/:id_editorial', bodyParser.json(), (req , res)=>{
    const { actualizar }  = req.body
    const { id_editorial } = req.params
    mysqlConnect.query('UPDATE editorial SET estado = ?  WHERE id_editorial = ?', [actualizar, id_editorial], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json({
                status:true,
                mensaje: "El cambio de estado se realizo correctamente"
                })
        }
    })
})

//////////////EDITAR EDITORIAL////////////
    // el parametro que vamos a editar ->id_editorial
    router.put('/editorial/:id_editorial', bodyParser.json(), (req , res)=>{
        const { nombre }  = req.body
        const { id_editorial } = req.params
        mysqlConnect.query('UPDATE editorial SET nombre = ?  WHERE id_editorial = ?', [nombre, id_editorial], (error, registros)=>{
           if(error){
               console.log('Error en la base de datos', error)
           }else{
            res.json({
                status:true,
                mensaje: "Se editó correctamente"
                })
           }
       })
    })

    ////////////ELIMINAR EDITORIAL///////
    router.delete('/editorial/:id_editorial', bodyParser.json(), (req , res)=>{
        const { id_editorial } = req.params
        mysqlConnect.query('DELETE FROM editorial WHERE id_editorial = ?', id_editorial, (error, registros)=>{
           if(error){
            console.log(error)         
                res.json({
                status:false,
                mensaje: error
            })
           }else{
             res.json({
                status:true,
                mensaje: 'La eliminacion del registro ' +id_editorial+ ' se realizo correctamente'
            })
           }
       })
    })
module.exports = router;
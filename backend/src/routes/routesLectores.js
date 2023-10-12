const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()



//////////LISTAR EDITORIALES//////

router.get('/lectores',(req , res)=>{
    mysqlConnect.query('SELECT * FROM lectores', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
            }
        })
    })

    ////////////TRAER DATOS DE LECTORES POR ID//////////
router.get('/lectores/:id_lector', (req , res)=>{
    const { id_lector } = req.params
    mysqlConnect.query('SELECT * FROM lectores WHERE id_lector=?', [id_lector], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

//////////////EDITAR LECTORES////////////
    // el parametro que vamos a editar ->id_editorial
    router.put('/lectores/:id_lector', bodyParser.json(), (req , res)=>{
        const {nombre, apellido, dni, correo}  = req.body
        const { id_lector } = req.params
        mysqlConnect.query('UPDATE lectores SET nombre = ?, apellido = ?, dni = ?, correo = ? WHERE (id_lector = ?)', [nombre, apellido, dni, correo, id_lector], (error, registros)=>{
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

    /////////////AGREGAR LECTORES/////////
    router.post('/lectores', bodyParser.json(), (req , res)=>{
        const { nombre, apellido, dni, correo }  = req.body
      
        mysqlConnect.query('INSERT INTO lectores (nombre, apellido, dni, correo) VALUES (?,?,?,?)', [nombre,apellido,dni, correo], (error, registros)=>{
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
    ////////////ELIMINAR LECTOR///////
router.delete('/lectores/:id_lector', bodyParser.json(), (req , res)=>{
    const { id_lector } = req.params
    mysqlConnect.query('DELETE FROM lectores WHERE id_lector = ?', id_lector, (error, registros)=>{
       if(error){
           
            res.json({
            status:false,
            mensaje: error
        })
       }else{
         res.json({
            status:true,
            mensaje: 'La eliminacion del registro ' +id_lector+ ' se realizo correctamente'
        })
          
       }
   })
})


    module.exports = router;
const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()



router.get('/Autores', (req , res)=>{
    mysqlConnect.query('SELECT a.id_autor, a.nombre, a.estado, e.nombre AS editorial FROM autores AS a INNER JOIN editorial AS e ON e.id_editorial=a.id_editorial', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

////////////TRAER DATOS DE AUTOR POR ID//////////
router.get('/autores/:id_autor', (req , res)=>{
    const { id_autor } = req.params
    mysqlConnect.query('SELECT * FROM autores WHERE id_autor=?', [id_autor], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

    /////////////AGREGAR AUTORES/////////
    router.post('/autores', bodyParser.json(), (req , res)=>{
        const { nombre, id_editorial }  = req.body
       
        mysqlConnect.query('INSERT INTO autores (nombre, id_editorial) VALUES (?, ?)', [nombre, id_editorial], (error, registros)=>{
           if(error){
               res.json({
                   status:false,
                   mensaje: error
                   })
           }else{
               res.json({
                   status:true,
                   mensaje: "se agrego correctamente"
                   })
           }
       })
   })

   ////////////CAMBIAR ESTADO AUTORES/////////
router.put('/autores/:id_autor', bodyParser.json(), (req , res)=>{
    const { actualizar }  = req.body
    const { id_autor } = req.params
    mysqlConnect.query('UPDATE autores SET estado = ?  WHERE id_autor = ?', [actualizar, id_autor], (error, registros)=>{
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
////////////ELIMINAR AUTOR///////
router.delete('/autores/:id_autor', bodyParser.json(), (req , res)=>{
    const { id_autor } = req.params
    mysqlConnect.query('DELETE FROM autores WHERE id_autor = ?', id_autor, (error, registros)=>{
       if(error){
           
            res.json({
            status:false,
            mensaje: error
        })
       }else{
         res.json({
            status:true,
            mensaje: 'La eliminacion del registro ' +id_autor+ ' se realizo correctamente'
        })
          
       }
   })
})

//////////////EDITAR AUTORES////////////
    // el parametro que vamos a editar ->id_autor
    router.put('/autores/:id_autor', bodyParser.json(), (req , res)=>{
        const { nombre}  = req.body
        const { id_autor} = req.params
        mysqlConnect.query('UPDATE autores SET nombre = ?  WHERE id_autor = ?', [nombre, id_autor], (error, registros)=>{
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

module.exports= router;
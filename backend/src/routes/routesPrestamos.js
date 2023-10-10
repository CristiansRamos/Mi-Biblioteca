const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()



//////////LISTAR PRESTAMOS//////

router.get('/prestamos',(req , res)=>{
    mysqlConnect.query('SELECT p.id_prestamo, p.fechaPrestamo, p.fechaDevolucion, p.estado , l.nombre AS libros, le.dni, concat_ws(" ", le.nombre, le.apellido) nombreCompleto FROM prestamos AS p INNER JOIN lectores AS le ON le.id_lector=p.id_lector INNER JOIN libros AS l ON l.id_libro=p.id_libro', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
            }
        })
    })

    /////////////AGREGAR PRESTAMOS/////////
    router.post('/prestamos', bodyParser.json(), (req , res)=>{
        const { id_lector, id_libro, fechaPrestamo, fechaDevolucion }  = req.body
       
        mysqlConnect.query('INSERT INTO prestamos (id_lector, id_libro, fechaPrestamo, fechaDevolucion) VALUES (?, ?, ?, ?)', [id_lector, id_libro, fechaPrestamo, fechaDevolucion], (error, registros)=>{
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
    ////////////ELIMINAR PRESTAMO///////
    router.delete('/prestamos/:id_prestamo', bodyParser.json(), (req , res)=>{
        const { id_prestamo } = req.params
        mysqlConnect.query('DELETE FROM prestamos WHERE id_prestamo = ?', id_prestamo, (error, registros)=>{
           if(error){
               
                res.json({
                status:false,
                mensaje: error
            })
           }else{
             res.json({
                status:true,
                mensaje: 'La eliminacion del registro ' +id_prestamo+ ' se realizo correctamente'
            })
              
           }
       })
    })


    module.exports = router;
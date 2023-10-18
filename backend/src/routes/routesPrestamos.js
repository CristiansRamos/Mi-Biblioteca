const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()
const jwt = require('jsonwebtoken')


//////////LISTAR PRESTAMOS//////

router.get('/prestamos',verificarToken, (req , res)=>{
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT p.id_prestamo, p.fechaPrestamo, p.fechaDevolucion, p.estado , l.nombre AS libros, le.dni, concat_ws(" ", le.nombre, le.apellido) nombreCompleto FROM prestamos AS p INNER JOIN lectores AS le ON le.id_lector=p.id_lector INNER JOIN libros AS l ON l.id_libro=p.id_libro', (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json(registros)
                    }
                })
            }
        })
    })

    /////////////AGREGAR PRESTAMOS/////////
    router.post('/prestamos', bodyParser.json(), verificarToken,(req , res)=>{
        const { id_lector, id_libro, fechaPrestamo, fechaDevolucion }  = req.body
        jwt.verify(req.token, 'biblioteca', (error, valido)=>{
            if(error){
                res.sendStatus(403);
            }else{
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
        }
    })
})
    ////////////ELIMINAR PRESTAMO///////
    router.delete('/prestamos/:id_prestamo', bodyParser.json(), verificarToken, (req , res)=>{
        const { id_prestamo } = req.params
        jwt.verify(req.token, 'biblioteca', (error, valido)=>{
            if(error){
                res.sendStatus(403);
            }else{
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
        }
    })
})

           ////////////CAMBIAR ESTADO PRESTAMOS/////////
router.put('/prestamos/:id_prestamo', bodyParser.json(), verificarToken,(req , res)=>{
    const { actualizar }  = req.body
    const { id_prestamo } = req.params
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('UPDATE prestamos SET estado = ?  WHERE id_prestamo = ?', [actualizar, id_prestamo], (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json({
                        status:true,
                        mensaje: "El cambio de estado se realizo correctamente"
                        })
                }
            })
        }
    })
})

//////////////EDITAR PRESTAMO////////////
    // el parametro que vamos a editar ->id_ prestamo
    router.put('/prestamos/:id_prestamo', bodyParser.json(), verificarToken,(req , res)=>{
        const { nombre }  = req.body
        const { id_prestamo } = req.params
        jwt.verify(req.token, 'biblioteca', (error, valido)=>{
            if(error){
                res.sendStatus(403);
            }else{
                mysqlConnect.query('UPDATE prestamo SET nombre = ?  WHERE id_prestamo = ?', [nombre, id_prestamo], (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json({
                        status:true,
                        mensaje: "Se editó correctamente"
                        })
                }
            })
        }
    })
})
//////////////////FUNCION VERIFICAR TOKEN///////////
function verificarToken(req, res, next){
    const bearer= req.headers['authorization'];
    if(typeof bearer!=='undefined'){
        const token =bearer.split(" ")[1]
        req.token= token;
        next()
    }else{
        res.send('Debe contener un token')
    }
 }

    module.exports = router;
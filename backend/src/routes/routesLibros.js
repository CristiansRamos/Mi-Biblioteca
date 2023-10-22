const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()
const jwt = require('jsonwebtoken')



// LISTAR LIBROS // METODO GET

router.get('/Libros', verificarToken, (req , res)=>{
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query("SELECT l.id_libro, l.nombre, g.nombre generos, concat_ws(' - ', a.nombre, e.nombre) autor_editorial, u.nombre ubicacion, l.serial, l.estado FROM libros AS l INNER JOIN generos AS g ON g.id_genero = l.id_genero LEFT JOIN autores AS a ON a.id_autor = l.id_autor LEFT JOIN ubicaciones AS u ON u.id_ubicacion = l.id_ubicacion LEFT JOIN editorial AS e ON e.id_editorial = a.id_editorial", (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json(registros)
                }
            })
        }
    })
})

    /////////////AGREGAR LIBROS/////////
    router.post('/libros', bodyParser.json(), (req , res)=>{
        const { nombre, id_genero, id_ubicacion, id_autor}  = req.body
      
        mysqlConnect.query('INSERT INTO libros (nombre, id_genero, id_ubicacion, id_autor) VALUES (?,?,?,?)', [nombre, id_genero, id_ubicacion, id_autor], (error, registros)=>{
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


       ////////////CAMBIAR ESTADO LIBROS/////////
router.post('/libros/:id_libro', bodyParser.json(), (req , res)=>{
    const { actualizar }  = req.body
    const { id_libro } = req.params
    mysqlConnect.query('UPDATE libros SET estado = ?  WHERE id_libro = ?', [actualizar, id_libro], (error, registros)=>{
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


    ////////////ELIMINAR LIBRO///////
    router.delete('/libros/:id_libro', bodyParser.json(), (req , res)=>{
        const { id_libro } = req.params
        mysqlConnect.query('DELETE FROM libros WHERE id_libro = ?', id_libro, (error, registros)=>{
           if(error){
               
                res.json({
                status:false,
                mensaje: error
            })
           }else{
             res.json({
                status:true,
                mensaje: 'La eliminacion del registro ' +id_libro+ ' se realizo correctamente'
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
module.exports= router;

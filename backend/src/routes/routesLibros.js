const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()


// LISTAR LIBROS // METODO GET

router.get('/Libros', (req , res)=>{
    mysqlConnect.query("SELECT l.id_libro, l.nombre, g.nombre generos, concat_ws(' - ', a.nombre, e.nombre) autor_editorial, u.nombre ubicacion, l.serial, l.estado FROM libros AS l INNER JOIN generos AS g ON g.id_genero = l.id_genero LEFT JOIN autores AS a ON a.id_autor = l.id_autor LEFT JOIN ubicaciones AS u ON u.id_ubicacion = l.id_ubicacion LEFT JOIN editorial AS e ON e.id_editorial = a.id_editorial", (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
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

module.exports= router;

const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()


// LISTAR LIBROS // METODO GET

router.get('/Libros', (req , res)=>{
    mysqlConnect.query("SELECT l.id_libro, l.nombre, g.nombre generos, concat_ws(' - ', a.nombre, e.nombre) autor_editorial, u.nombre lugar_ubicacion, l.serial, l.estado FROM libros AS l INNER JOIN generos AS g ON g.id_genero = l.id_genero LEFT JOIN autores AS a ON a.id_autor = l.id_autor LEFT JOIN ubicaciones AS u ON u.id_ubicacion = l.id_ubicacion LEFT JOIN editorial AS e ON e.id_editorial = a.id_editorial", (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

module.exports= router;

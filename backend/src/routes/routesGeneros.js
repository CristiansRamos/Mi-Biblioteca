const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()
const jwt = require('jsonwebtoken')

//////////LISTAR GENEROS//////

router.get('/generos',verificarToken,(req , res)=>{
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT * FROM generos', (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json(registros)
                    }
                })
            }
        })
    })

    ////////////TRAER DATOS DE GENEROS POR ID//////////
router.get('/generos/:id_generos', verificarToken,(req , res)=>{
    const { id_genero } = req.params
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT * FROM generos WHERE id_genero=?', [id_genero], (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json(registros)
                }
            })
        }
    })
})

    /////////////AGREGAR GENEROS/////////
router.post('/generos', bodyParser.json(), verificarToken,(req , res)=>{
    const { nombre }  = req.body
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
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
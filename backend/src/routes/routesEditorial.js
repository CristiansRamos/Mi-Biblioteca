const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()
const jwt = require('jsonwebtoken')


//////////LISTAR EDITORIALES//////

router.get('/editorial',verificarToken,(req , res)=>{
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT * FROM editorial', (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json(registros)
                    }
                })
            }
        })
     })

    /////////////AGREGAR EDITORIAL/////////
router.post('/editorial', bodyParser.json(), verificarToken,(req , res)=>{
    const { nombre }  = req.body
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
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
        }
    })
})

////////////TRAER DATOS DE EDITORIAL POR ID//////////
router.get('/editorial/:id_editorial', verificarToken,(req , res)=>{
    const { id_editorial } = req.params
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT * FROM editorial WHERE id_editorial=?', [id_editorial], (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json(registros)
                }
            })
        }
    })
})

////////////CAMBIAR ESTADO EDITORIAL/////////
router.post('/editorial/:id_editorial', bodyParser.json(), verificarToken,(req , res)=>{
    const { actualizar }  = req.body
    const { id_editorial } = req.params
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
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
        }
    })
})

//////////////EDITAR EDITORIAL////////////
    // el parametro que vamos a editar ->id_editorial
    router.put('/editorial/:id_editorial', bodyParser.json(), verificarToken,(req , res)=>{
        const { nombre }  = req.body
        const { id_editorial } = req.params
        jwt.verify(req.token, 'biblioteca', (error, valido)=>{
            if(error){
                res.sendStatus(403);
            }else{
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
        }
    })
})

    ////////////ELIMINAR EDITORIAL///////
    router.delete('/editorial/:id_editorial', bodyParser.json(), verificarToken,(req , res)=>{
        const { id_editorial } = req.params
        jwt.verify(req.token, 'biblioteca', (error, valido)=>{
            if(error){
                res.sendStatus(403);
            }else{
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
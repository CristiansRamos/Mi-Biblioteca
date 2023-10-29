const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()
const jwt = require('jsonwebtoken')


//////////LISTAR GENEROES//////

router.get('/genero',verificarToken,(req , res)=>{
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

    /////////////AGREGAR GENERO/////////
router.post('/genero', bodyParser.json(), verificarToken,(req , res)=>{
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

////////////TRAER DATOS DE GENERO POR ID//////////
router.get('/genero/:id_genero', verificarToken,(req , res)=>{
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

////////////CAMBIAR ESTADO GENERO/////////
router.post('/genero/:id_genero', bodyParser.json(), verificarToken,(req , res)=>{
    const { actualizar }  = req.body
    const { id_genero } = req.params
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('UPDATE generos SET estado = ?  WHERE id_genero = ?', [actualizar, id_genero], (error, registros)=>{
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

//////////////EDITAR GENERO////////////
    // el parametro que vamos a editar ->id_genero
    router.put('/genero/:id_genero', bodyParser.json(), verificarToken,(req , res)=>{
        const { nombre }  = req.body
        const { id_genero } = req.params
        jwt.verify(req.token, 'biblioteca', (error, valido)=>{
            if(error){
                res.sendStatus(403);
            }else{
                mysqlConnect.query('UPDATE generos SET nombre = ?  WHERE id_genero = ?', [nombre, id_genero], (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json({
                        status:true,
                        mensaje: "Se actualizó correctamente"
                        })
                }
            })
        }
    })
})

    ////////////ELIMINAR GENERO///////
    router.delete('/genero/:id_genero', bodyParser.json(), verificarToken,(req , res)=>{
        const { id_genero } = req.params
        jwt.verify(req.token, 'biblioteca', (error, valido)=>{
            if(error){
                res.sendStatus(403);
            }else{
                mysqlConnect.query('DELETE FROM generos WHERE id_genero = ?', id_genero, (error, registros)=>{
                if(error){
                    console.log(error)         
                        res.json({
                        status:false,
                        mensaje: error
                    })
                }else{
                    res.json({
                        status:true,
                        mensaje: 'La eliminacion del registro ' +id_genero+ ' se realizo correctamente'
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
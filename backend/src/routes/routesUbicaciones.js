const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()
const jwt = require('jsonwebtoken')

//////////LISTAR UBICACIONES//////

router.get('/ubicaciones',verificarToken, (req , res)=>{
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT * FROM ubicaciones', (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json(registros)
                    }
                })
            }
        })
    })

////////////TRAER DATOS DE UBICACIONES POR ID//////////
router.get('/ubicaciones/:id_ubicacion', verificarToken,(req , res)=>{
    const { id_ubicacion } = req.params
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT * FROM ubicaciones WHERE id_ubicacion=?', [id_ubicacion], (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json(registros)
                }
            })
        }
    })
})

    /////////////AGREGAR UBICACIONES/////////
router.post('/ubicaciones', bodyParser.json(), verificarToken,(req , res)=>{
    const { nombre }  = req.body
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('INSERT INTO ubicaciones (nombre) VALUES (?)', [nombre], (error, registros)=>{
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

//////////////EDITAR UBICACION////////////
    // el parametro que vamos a editar ->id_ubicacion
    router.put('/ubicaciones/:id_ubicacion', bodyParser.json(), verificarToken,(req , res)=>{
        const { nombre }  = req.body
        const { id_ubicacion } = req.params
        jwt.verify(req.token, 'biblioteca', (error, valido)=>{
            if(error){
                res.sendStatus(403);
            }else{
                mysqlConnect.query('UPDATE ubicaciones SET nombre = ?  WHERE id_ubicacion = ?', [nombre, id_ubicacion], (error, registros)=>{
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

////////////CAMBIAR ESTADO UBICACION/////////
router.post('/ubicaciones/:id_ubicacion', bodyParser.json(), verificarToken,(req , res)=>{
    const { actualizar }  = req.body
    const { id_ubicacion } = req.params
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('UPDATE ubicaciones SET estado = ?  WHERE id_ubicacion = ?', [actualizar, id_ubicacion], (error, registros)=>{
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

    ////////////ELIMINAR UBICACION///////
    router.delete('/ubicaciones/:id_ubicacion', bodyParser.json(), verificarToken, (req , res)=>{
        const { id_ubicacion } = req.params
        jwt.verify(req.token, 'biblioteca', (error, valido)=>{
            if(error){
                res.sendStatus(403);
            }else{
                mysqlConnect.query('DELETE FROM ubicaciones WHERE id_ubicacion = ?', id_ubicacion, (error, registros)=>{
                if(error){           
                        res.json({
                        status:false,
                        mensaje: error
                    })
                }else{
                    res.json({
                        status:true,
                        mensaje: 'La eliminacion del registro ' +id_ubicacion+ ' se realizo correctamente'
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
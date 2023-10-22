const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()
const jwt = require('jsonwebtoken')



//////////LISTAR EDITORIALES//////

router.get('/lectores',verificarToken,(req , res)=>{
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT le.id_lector, le.nombre, le.apellido, le.dni, le.correo, le.estado, concat_ws("-", le.nombre, le.apellido, le.dni) nombreCompleto FROM lectores AS le', (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json(registros)
                    }
                })
            }
        })
    })

    ////////////TRAER DATOS DE LECTORES POR ID//////////
router.get('/lectores/:id_lector', verificarToken,(req , res)=>{
    const { id_lector } = req.params
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT * FROM lectores WHERE id_lector=?', [id_lector], (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json(registros)
                }
            })
        }
    })
})

//////////////EDITAR LECTORES////////////
    // el parametro que vamos a editar ->id_editorial
    router.put('/lectores/:id_lector', bodyParser.json(), verificarToken,(req , res)=>{
        const {nombre, apellido, dni, correo}  = req.body
        const { id_lector } = req.params
        jwt.verify(req.token, 'biblioteca', (error, valido)=>{
            if(error){
                res.sendStatus(403);
            }else{
                mysqlConnect.query('UPDATE lectores SET nombre = ?, apellido = ?, dni = ?, correo = ? WHERE (id_lector = ?)', [nombre, apellido, dni, correo, id_lector], (error, registros)=>{
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

    /////////////AGREGAR LECTORES/////////
    router.post('/lectores', bodyParser.json(), verificarToken,(req , res)=>{
        const { nombre, apellido, dni, correo }  = req.body
        jwt.verify(req.token, 'biblioteca', (error, valido)=>{
            if(error){
                res.sendStatus(403);
            }else{
                mysqlConnect.query('INSERT INTO lectores (nombre, apellido, dni, correo) VALUES (?,?,?,?)', [nombre,apellido,dni, correo], (error, registros)=>{
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

       ////////////CAMBIAR ESTADO LECTORES/////////
       router.post('/lectores/:id_lector', bodyParser.json(), (req , res)=>{
        const { actualizar }  = req.body
        const { id_lector } = req.params
        mysqlConnect.query('UPDATE lectores SET estado = ?  WHERE id_lector = ?', [actualizar, id_lector], (error, registros)=>{
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

    ////////////ELIMINAR LECTOR///////
router.delete('/lectores/:id_lector', bodyParser.json(), verificarToken,(req , res)=>{
    const { id_lector } = req.params
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('DELETE FROM lectores WHERE id_lector = ?', id_lector, (error, registros)=>{
            if(error){
                
                    res.json({
                    status:false,
                    mensaje: error
                })
            }else{
                res.json({
                    status:true,
                    mensaje: 'La eliminacion del registro ' +id_lector+ ' se realizo correctamente'
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
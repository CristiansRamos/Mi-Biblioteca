const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()
const jwt = require('jsonwebtoken')


/////////lISTAR  USUARIOS////
router.get('/usuarios', verificarToken, (req , res)=>{
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT u.id_usuario, u.apellido, u.nombre, u.dni, u.user, u.correo, u.id_rol, r.nombre rol, u.estado FROM usuarios AS u INNER JOIN roles AS r ON r.id_rol=u.id_rol', (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json(registros)
                }
            })
        }
    })
})

/////////////LISTAR ROLES////////
router.get('/roles', verificarToken, (req , res)=>{
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT r.id_rol, r.nombre FROM roles AS r', (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json(registros)
                }
            })
        }
    })
})

/////////////TRAER USUARIOS POR ID////////////
router.get('/usuarios/:id_usuarios', verificarToken, (req , res)=>{
    const {id_usuarios}= req.params
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('SELECT * FROM usuarios WHERE id_usuarios=?', [id_usuarios] , (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json(registros)
                }
            })
        }
    })
})

/////////////INSERTAR USUARIOS///////////////
router.post('/usuarios', bodyParser.json(), verificarToken, (req , res)=>{
    const{nombre, id_usuarios, apellido, correo, id_rol, estado} = req.body
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('INSERT INTO usuarios (nombre, id_usuarios, apellido, correo, id_rol, estado) VALUES (?,?,?,?,?,?)', [nombre, id_usuarios, apellido, correo, ,id_rol, estado] , (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.send('el insert se realizo correctamente :)')
                }
            })
        }
    })
})

/////////////MODIFICAR LOS USUARIOS///////////////
router.put('/usuarios/:id_usuarios', bodyParser.json(), verificarToken, (req , res)=>{
    
    const{nombre, id_usuarios, apellido, correo, estado} = req.body
    const {id_empleado} = req.params
    jwt.verify(req.token, 'biblioteca', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConnect.query('UPDATE usuarios SET nombre = ? apellido = ? WHERE id_usuarios = ?', [nombre, id_usuarios, apellido, correo, estado] , (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.send('se modifico correctamente :)')
                }
            })
        }
    })
})

    ////////////ELIMINAR USUARIOS///////
    router.delete('/usuarios/:id_usuario', bodyParser.json(), verificarToken, (req , res)=>{
        const { id_usuario } = req.params
        jwt.verify(req.token, 'biblioteca', (error, valido)=>{
            if(error){
                res.sendStatus(403);
            }else{
                mysqlConnect.query('DELETE FROM usuarios WHERE id_usuario = ?', id_usuario, (error, registros)=>{
                if(error){
                    
                        res.json({
                        status:false,
                        mensaje: error
                    })
                }else{
                    res.json({
                        status:true,
                        mensaje: 'La eliminacion del registro ' +id_usuario+ ' se realizo correctamente'
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

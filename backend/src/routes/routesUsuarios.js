const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()


/////////lISTAR  USUARIOS////
router.get('/usuarios', (req , res)=>{
    mysqlConnect.query('SELECT u.id_usuario, u.apellido, u.nombre, u.dni, u.user, u.correo, u.id_rol, r.nombre rol, u.estado FROM usuarios AS u INNER JOIN roles AS r ON r.id_rol=u.id_rol', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

/////////////LISTAR ROLES////////
router.get('/roles', (req , res)=>{
    mysqlConnect.query('SELECT r.id_rol, r.nombre FROM roles AS r', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

/////////////TRAER USUARIOS POR ID////////////
router.get('/usuarios/:id_usuarios', (req , res)=>{
    const {id_usuarios}= req.params
    mysqlConnect.query('SELECT * FROM usuarios WHERE id_usuarios=?', [id_usuarios] , (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

/////////////INSERTAR USUARIOS///////////////
router.post('/usuarios', bodyParser.json(), (req , res)=>{
    const{nombre, id_usuarios, apellido, correo, id_rol, estado} = req.body
    mysqlConnect.query('INSERT INTO usuarios (nombre, id_usuarios, apellido, correo, id_rol, estado) VALUES (?,?,?,?,?,?)', [nombre, id_usuarios, apellido, correo, ,id_rol, estado] , (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.send('el insert se realizo correctamente :)')
        }
    })
})

/////////////MODIFICAR LOS USUARIOS///////////////
router.put('/usuarios/:id_usuarios', bodyParser.json(), (req , res)=>{
    const{nombre, id_usuarios, apellido, correo, estado} = req.body
    const {id_empleado} = req.params
    mysqlConnect.query('UPDATE usuarios SET nombre = ? apellido = ? WHERE id_usuarios = ?', [nombre, id_usuarios, apellido, correo, estado] , (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.send('se modifico correctamente :)')
        }
    })
})

    ////////////ELIMINAR USUARIOS///////
    router.delete('/usuarios/:id_usuario', bodyParser.json(), (req , res)=>{
        const { id_usuario } = req.params
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
    })

module.exports= router;

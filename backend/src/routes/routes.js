const express= require('express');

const coneccion = require('../database/bd')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

//router.use(bodyParser.json);

const router = express();

////////////////////REGISTRO/////////////////

router.post('/registro', bodyParser.json(), (req , res)=>{
    console.log(req.body)
    const {nombre, apellido, dni, user, pass, correo, id_rol, estado}= req.body
    let hash = bcrypt.hashSync(pass, 10)

    coneccion.query('INSERT INTO usuarios (nombre, apellido, dni, user, pass, correo, id_rol, estado) VALUES (?,?,?,?,?,?,?,?)', [nombre, apellido, dni, user, hash, correo, id_rol, estado], (error, resul)=>{
        if(error){
            console.log('hubo un error', error)
          
        }else {
            res.json({
                status: true,
                mensaje: 'el registro se grabo correctamente'
                    })
                }

            })
        })
    //res.send('holaaaa')

/////////////////// LOGIN  //////////////

router.post('/login', bodyParser.json(), (req , res)=>{
    const {user, pass}= req.body
    coneccion.query( 'SELECT * FROM usuarios WHERE user=?', [user], (error, registros)=>{
        if(!error){
            console.log(registros)
        }else {
            res.json({
                status: false,
                mensaje: 'error'
        })
        }
    })
})


/////////lISTAR MODELOS/////
router.get('/usuarios', (req , res)=>{
    coneccion.query('SELECT * FROM usuarios', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})
/////////////traer datos del modulo por id////////////
router.get('/usuarios/:id_usuarios', (req , res)=>{
    const {id_usuarios}= req.params
    coneccion.query('SELECT * FROM usuarios WHERE id_usuarios=?', [id_usuarios] , (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

/////////////INSERTAR LOS MODULOS///////////////
router.post('/usuarios', bodyParser.json(), (req , res)=>{
    const{nombre, id_usuarios, apellido, correo, estado} = req.body
    coneccion.query('INSERT INTO usuarios (nombre, id_usuarios, apellido, correo, estado) VALUES (?,?,?,?,?)', [nombre, id_usuarios, apellido, correo, estado] , (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.send('el insert se realizo correctamente :)')
        }
    })
})

/////////////MODIFICAR LOS MODULOS///////////////
router.put('/usuarios/:id_usuarios', bodyParser.json(), (req , res)=>{
    const{nombre, id_usuarios, apellido, correo, estado} = req.body
    const {id_empleado} = req.params
    coneccion.query('UPDATE usuarios SET nombre = ? apellido = ? WHERE id_usuarios = ?', [nombre, id_usuarios, apellido, correo, estado] , (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.send('se modifico correctamente :)')
        }
    })
})


module.exports = router;
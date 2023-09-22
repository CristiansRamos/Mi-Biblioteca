const express= require('express');

const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');

//router.use(bodyParser.json);

const router = express();

////////////////////REGISTRO/////////////////

router.post('/registro', bodyParser.json() , (req , res)=>{
    const {apellido, nombre , dni, user, pass, correo, id_rol} =req.body;
    //
    //console.log(req.body)
    let hash= bcrypt.hashSync(pass, 10);
    //
    if(!dni){
        res.json({
            status:false,
            mensaje: "El DNI es un campo obligatorio"
        })
    };


    mysqlConnect.query('SELECT * FROM usuarios WHERE user=?', [user], (error, usuarios)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            if(usuarios.length>0){
                // no puede grabar 
                res.json({
                    status:false,
                    mensaje:"El nombre de usuario ya existe" 
                })
            }else{
                mysqlConnect.query('INSERT INTO usuarios (apellido, nombre, dni, user, pass, correo, id_rol ) VALUES (?,?,?,?,?,?,?)', [apellido, nombre, dni, user, hash, correo, id_rol ], (error, registros)=>{
                    if(error){
                        console.log('Error en la base de datos al momento de insertar ----> ', error)
                    }else{
                        res.json({
                            status:true,
                            mensaje: "El registro se grabo correctamente"
                        })
                    }
                })
            }
        }
    })
})

/////////////////// LOGIN  //////////////

router.post('/login', bodyParser.json() , (req , res)=>{
    const {user, pass} =req.body
    if(!user){
        res.json({
            status:false,
            mensaje:"El usuario es un dato obligatorio para el login" 
        })
         return; 
    }
    if(!pass){
        res.json({
            status:false,
            mensaje:"El password es un dato obligatorio para el login" 
        }) 
        return;
    }
    mysqlConnect.query('SELECT * FROM usuarios WHERE user=?', [user], (error, usuario)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            if(usuario.length>0){
                console.log('estado de la comparacion', usuario[0].pass)
                 const comparacion= bcrypt.compareSync(pass, usuario[0].pass)   
                 console.log('estado de la comparacion', comparacion)
                 if(comparacion)  {

                    // vamos a generar el token
                    jwt.sign({usuario}, 'biblioteca', (error, token)=>{

                        res.json({
                            status: true,
                            datos: usuario,
                            token: token
                        }) 
                    })

                    
                 }else{
                    res.json({
                        status:false,
                        mensaje:"La contraseña es incorrecta" 
                    }) 
                 }
            }else{
                res.json({
                    status:false,
                    mensaje:"El usuario NO EXISTE" 
                }) 
            }
        }
    })
    

})


/////////lISTAR MODELOS/////
router.get('/usuarios', (req , res)=>{
    mysqlConnect.query('SELECT * FROM usuarios', (error, registros)=>{
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
    mysqlConnect.query('SELECT * FROM usuarios WHERE id_usuarios=?', [id_usuarios] , (error, registros)=>{
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
    mysqlConnect.query('INSERT INTO usuarios (nombre, id_usuarios, apellido, correo, estado) VALUES (?,?,?,?,?)', [nombre, id_usuarios, apellido, correo, estado] , (error, registros)=>{
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
    mysqlConnect.query('UPDATE usuarios SET nombre = ? apellido = ? WHERE id_usuarios = ?', [nombre, id_usuarios, apellido, correo, estado] , (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.send('se modifico correctamente :)')
        }
    })
})


module.exports = router;
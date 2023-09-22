const mysql = require('mysql');

const miConexionMysql = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'root',
    database: 'mi_biblioteca'
});

miConexionMysql.connect(function(err){
    if(err){
        console.log(`mi error es ${err}`)
        return;
    }else{
        console.log('mi conexion se realizo correctamente')
    }
})

module.exports = miConexionMysql;
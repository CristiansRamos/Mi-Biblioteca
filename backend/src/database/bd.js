const mysql = require('mysql');

const miConeccionMysql = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'root',
    database: 'mi_biblioteca'
});

miConeccionMysql.connect(function(err){
    if(err){
        console.log(`mi error es ${err}`)
        return;
    }else{
        console.log('mi coneccion se realizo correctamente')
    }
})

module.exports = miConeccionMysql;
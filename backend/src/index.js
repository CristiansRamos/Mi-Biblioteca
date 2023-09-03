const express= require('express');
const app = express();

const morgan = require('morgan');
app.set('puerto', 2023);
app.use(morgan('dev'));

app.use(require('./routes/routes')); //importo las rutas 

app.listen(app.get('puerto'), ()=>{
    console.log('mi servidor esta corriendo en el puerto', app.get('puerto'))
});
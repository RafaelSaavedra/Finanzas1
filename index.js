const express = require('express');
const app = express();
const cors = require('cors');
const 
  {
    MONGOOSE_CONNECT,
    PORT
  }
 = require('./config')
const mongoose = require ('mongoose');
const ingresos = require ('./src/routes/ingresos');
const egresos = require ('./src/routes/egresos');
const productos = require ('./src/routes/productos')
const matPrimas = require ('./src/routes/matPrimas');
const clientes = require ('./src/routes/clientes');
const proveedores = require ('./src/routes/proveedores');

const morgan = require ('morgan')

//console.log( )

/*
mongoose.connect('mongodb+srv://Rafael:15Anestesiologia20@cluster0.rnudzg3.mongodb.net/controlfinanzas?retryWrites=true&w=majority')
, //(err) => {
   // if( err) return console.log('Error al conectar a mongo...');

     console.log('Conexión a Mongo exitosa !'); 
   
//})
*/
app.use(morgan("dev"))
app.use(express.json()) //esta linea es muy importante para el post
app.use(express.urlencoded({
    extends : true // tarea investigar para que sirve esta linea de codigo
}))
app.use('/api/productos', productos)
app.use('/api/ingresos', ingresos)
app.use('/api/clientes', clientes)
app.use('/api/matPrimas', matPrimas)
app.use('/api/egresos', egresos)
app.use('/api/proveedores', proveedores)



mongoose.connect(MONGOOSE_CONNECT)
.then(() => {
    console.log('Se ha conectado a la base de datos');
    
}).catch((err) => {
    console.log('Se ha encontrado un error: ', err);
    
});

app.use(cors({
    origin:'*'
}))

app.get ('/', (req, res) => {
    res.json([{
        nombre:'Gato',
        apellido:'Solis' 
    },
        {nombre:'Pedro',
        apellido:'Páramo'
    },
    ])
})

app.listen(PORT, () => {
console.log('Server Listening on port: http://localhost:3000');

})

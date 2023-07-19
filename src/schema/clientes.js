const mongoose = require ('mongoose');
const Schema = mongoose.Schema

const clienteSchema = new mongoose.Schema ({
    nombre : {
        type : String,
        required : true
    },
    clave : {
        type : String,
        required : true
    },
    correoE : {
        type : String,
        required : true
    }
    ,
    productos : [{
        type : Schema.Types.ObjectId,
        ref : 'Producto'
    }]

})

module.exports = mongoose.model('Cliente', clienteSchema)
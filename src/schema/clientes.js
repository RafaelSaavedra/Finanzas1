const mongoose = require ('mongoose');
const Schema = mongoose.Schema

const clienteSchema = new mongoose.Schema ({
    nombre : {
        type : String,
        required : true
    },
    clave : {
        type : String,
        required : false
    },
    productos : [{
        type : Schema.Types.ObjectId,
        ref : 'Producto'
    }]

})

module.exports = mongoose.model('Cliente', clienteSchema)
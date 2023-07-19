const mongoose = require ('mongoose');
const Schema = mongoose.Schema

const proveedorSchema = new mongoose.Schema ({
    nombre : {
        type : String,
        required : true
    },
    clave : {
        type : String,
        required : false
    },
    correoE : {
        type : String,
        required : true
    },
    
    matPrimas : [{
        type : Schema.Types.ObjectId,
        ref : 'MatPrima'
    }]

})

module.exports = mongoose.model('Proveedor', proveedorSchema)
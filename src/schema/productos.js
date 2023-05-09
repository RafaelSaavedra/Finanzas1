const mongoose = require ('mongoose')
const productoSchema = new mongoose.Schema ({
    nombre : {
        type : String,
        required : true
    },
    clave : {
        type : String,
    
    },
    precio : {
        type : Number,
        required : true,

    },
    impuestos : {
        type : Number,
        required : true,
    }
})

module.exports = mongoose.model ('Producto', productoSchema)
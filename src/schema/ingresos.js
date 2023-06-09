const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ingresoSchema = new mongoose.Schema ({
    fecha : {
        type: Date , 
        default: Date.now
    },
    factura : {
        type: String
    },
    cliente : {
        type : Schema.Types.ObjectId,
        ref :   'Cliente' 
    },
    producto : {
        type : String // para no null: required : true
    },
    claveProducto : {
        type : String
    },
    precio :{
        type : Number
    },
    cantidad :{
        type : Number
    },
    total : {
        type : Number
    },
    impuestos : {
        type : Number
    },
    credito : {
        type : Number
    },
    status : {
        type : Boolean
    },

})

module.exports = mongoose.model('Ingreso', ingresoSchema)
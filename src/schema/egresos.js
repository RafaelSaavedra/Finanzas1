const mongoose = require('mongoose');
const Schema = mongoose.Schema

const egresoSchema = new mongoose.Schema ({
    fecha : {
        type: Date , 
        default: Date.now
    },
    factura : {
        type: String
    },
    proveedor : {
        type : String
    },
    materiaPrima : {
        type : String // para no null: required : true
    },
    claveMatPrima: {
        type : String
    },
    precio :{
        type : Number
    },

    cantidad :{
        type : Number
    },
    precioTotal : {
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

module.exports = mongoose.model('Egreso', egresoSchema);
const validateCreate = (datos) => {
 
    let status1 = false 
    let message = " " 

    if (typeof datos.factura !== 'string'){
        status1 = true
        message = "La factura debe ser un string"
    }else if (typeof datos.proveedor !== 'string'){
        status1 = true
        message = "El Proveedor debe ser un string"
    }else if (typeof datos.materiaPrima !== 'string'){
        status1 = true
        message = "La Materia Prima debe ser un string"
    }else if (typeof datos.claveMatPrima !== 'string'){
        status1 = true
        message = "La clave de materia prima debe ser un string"
    }else if (validateNum(datos.precio, 1000, 'number')){
        status1 = true
        message = "Precio  debe ser un numero y debe ser menor a 1000"
    }else if (validateNum(datos.cantidad, 1000, 'number')){
        status1 = true
        message = "Cantidad  debe ser un numero y debe ser menor a 1000"
    }else if (validateNum(datos.precioTotal, 100000, 'number')){
        status1 = true
        message = "Precio total  debe ser un numero y debe ser menor a 100000"
    }else if (typeof datos.impuestos !== 'number'){
        status1 = true
        message = "Impuestos debe ser un number"
    }else if (typeof datos.credito !== 'number' || datos.credito > 200){
        status1 = true
        message = "Crédito debe ser un numero menor a 200"
    }else if (typeof datos.status !== 'boolean'){
            status1 = true
            message = " El status sólo acepta boleanos"
    } 


    return {status1, message}
} 

validateNum = (dato, max, type) => {

    return typeof dato !== type || dato > max
}

module.exports = {validateCreate}
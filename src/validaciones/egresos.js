const validateCreate = (datos) => {
    //aqui puedo hacer console.log con typeof para checar que tipo de dato es:
    console.log(typeof datos.fecha)
 
    let status1 = false // Esta variable se ocupará para saber si es correcto el dato, false significa que si es correcto y true lo contrario
    let message = " " // Aquí se mandará el mensaje del error

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
//aqui vamos a poner una funcion que abarque varias condiciones
//esta sera una forma para cuando tengamos demasiadas validaciones y no ponerlas en el if, solo llamando a la funcion para que los valide
validateNum = (dato, max, type) => {

    return typeof dato !== type || dato > max
}


module.exports = {validateCreate}
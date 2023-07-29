const validateCreate = (datos) => {

    let status = false 
    let message = " " 

    console.log(datos.clave)
    if (typeof datos.nombre !== 'string'){
        status = true
        message = "El nombre debe ser un string"
    }else if (typeof datos.clave !== 'string'){
        status = true
        message = "La clave debe ser un string"
    }else if (typeof datos.precio !== 'number'){
        status = true
        message = "El precio debe ser un number"
    }else if (typeof datos.impuestos !== 'number'){
        status = true
        message = "Impuestos debe ser un number"
    }
    
    
    return {status, message}
} 

module.exports = {validateCreate}
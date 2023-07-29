const validateCreate = (datos) => {


    let status = false 
    let message = " " 

    let expresionRegular =  /^[a-zA-Z]{5}\d{3}@hotmail[.]com$/;

    if (typeof datos.nombre !== 'string'){
        status = true
        message = "El nombre debe ser un string"
    }else if (typeof datos.clave !== 'string'){
        status = true
        message = "La clave debe ser un string"
    }else if (!expresionRegular.test(datos.correoE)){
        status = true
        message = "Correo debe tener 5 letras y 3 numeros y ser hotmail.com"
    
    }else if (datos.productos.length > 0 ){
        for(let i=0; i < datos.productos.length ; i++){
            if(typeof datos.productos[i] !== 'string'){
                status = true
                message = "la referencia de producto debe ser un string"
                break
            }
        }

    }

    return {status, message}
} 

validateNum = (dato, max, type) => {

    return typeof dato !== type || dato > max
}

module.exports = {validateCreate}
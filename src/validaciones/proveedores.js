const validateCreate = (datos) => {
    //aqui puedo hacer console.log con typeof para checar que tipo de dato es:
    console.log(typeof datos.nombre)

    let status = false // Esta variable se ocupará para saber si es correcto el dato, false significa que si es correcto y true lo contrario
    let message = " " // Aquí se mandará el mensaje del error

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
    
    }else if (datos.matPrimas.length > 0 ){
        //esto para saber si entramos
        console.log("dentro")
        for(let i=0; i < datos.matPrimas.length ; i++){
            if(typeof datos.matPrimas[i] !== 'string'){
                status = true
                message = "la referencia de producto debe ser un string"
                break
            }
        }

    }
    
    //este para saber si existen productos registrados
    console.log(datos.matPrimas.length > 0 )
    //este para saber cuantos productos estan registrados
    console.log(datos.matPrimas.length)

    
    return {status, message}
} 



module.exports = {validateCreate}
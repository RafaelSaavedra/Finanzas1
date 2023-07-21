const validateCreate = (datos) => {
    //aqui puedo hacer console.log con typeof para checar que tipo de dato es:
    console.log(typeof datos.impuestos)

    let status = false // Esta variable se ocupará para saber si es correcto el dato, false significa que si es correcto y true lo contrario
    let message = " " // Aquí se mandará el mensaje del error

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
    }else{
        message ="Todo jaló bien"
    }
    /*
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
*/
    
    
    //este para saber si existen productos registrados
    //console.log(datos.productos.length > 0 )
    //este para saber cuantos productos estan registrados
    //console.log(datos.productos.length)

    
    return {status, message}
} 



module.exports = {validateCreate}
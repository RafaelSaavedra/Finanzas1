const validateCreate = (datos) => {

    let status = false // Esta variable se ocupará para saber si es correcto el dato, false significa que si es correcto y true lo contrario
    let message = " " // Aquí se mandará el mensaje del error
    if(typeof datos.status !== 'boolean'){
        status = true
        message = " El status sólo acepta boleanos"
    }
    return {status, message}
} 

module.exports = {validateCreate}
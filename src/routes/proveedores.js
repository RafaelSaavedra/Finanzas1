const express = require('express')
const Proveedores = require('../schema/proveedores')
const { validateCreate } = require('../validaciones/proveedores')
const router = express.Router()


router.get('/', async(req, res) => {
    let proveedores = await Proveedores.find()
    res.json({
    //Hello : 'Mundo Proveedores'
    //res.json({
    proveedores
    //})
}) 
})

router.get('/:id', async (req,res) => {
    const {id} =  req.params

    let proveedor = await Proveedores.findById(id)
    res.json ({proveedor})

})

router.post('/',(req, res) => {
    
    let {status, message} = validateCreate(req.body)
    if(status){
        return res.json({message}), 400;
    }
    
    const body = req.body
    console.log(body.nombre)
    const proveedor = new Proveedores({
        nombre : body.nombre,
        clave : body.clave,
        correoE : body.correoE,
        matPrimas : body.matPrimas
    }) 
    proveedor.save()
    return res.json({proveedor})
})

router.put('/', async(req, res) => {

    let {status, message} = validateCreate(req.body)
    if(status){
        return res.json({message}), 400;
    }

    const {nombre, clave, correoE, matPrimas, id} = req.body
    let proveedor = await Proveedores.findByIdAndUpdate(
       // req.body.id  EN ESTE PUNTO YA NO REQUIERO EL BODY.ID PORQUE LO PEDI DESDE LA LINEA 14
        id,
        {
            // este tipo de objeto nos va a ayudar a la actualizacion:
            $set:{
                nombre,
                clave,
                correoE,
                matPrimas
            }
        },
        {new: true}
    )
    res.json({proveedor})
} )

router.delete('/:proveedorId', async(req, res) => {
    const proveedorId = req.params.proveedorId
    //definir una constante cliente ya no es necesario en este punto p
    //let cliente = await Clientes.findByIdAndDelete(
    await Proveedores.findByIdAndDelete( 
        proveedorId
    )
    res.json({"Mensaje": "Proveedor eliminado"})
} )


router.patch('/:proveedorId', async(req, res) => {

    let {status, message} = validateCreate(req.body)
    if(status){
        return res.json({message}), 400;
    }
    
    const {nombre, clave, correoE, matPrimas, id} = req.body
    let proveedor = await Proveedores.findByIdAndUpdate(
       // req.body.id en este punto ya no req.bodyId porque lo pedí desde linea 32 
        id,
        {
            // este tipo de objeto nos va a ayudar a la actualizacion:
            $set:{
                nombre,
                clave,
                correoE,
                matPrimas
            }
        },
        {new: true}
    )
    res.json({proveedor})
    })
 


module.exports = router
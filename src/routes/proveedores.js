const express = require('express')
const Proveedores = require('../schema/proveedores')
const { validateCreate } = require('../validaciones/proveedores')
const router = express.Router()


router.get('/', async(req, res) => {
    let proveedores = await Proveedores.find()
    res.json({
    proveedores
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

        id,
        {
    
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
        id,
        {
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
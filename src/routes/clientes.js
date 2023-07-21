const express = require('express')
const Clientes = require('../schema/clientes')
const { validateCreate } = require('../validaciones/clientes')
const router = express.Router()

router.get('/', async (req, res) => {
    let clientes = await Clientes.find()
    res.json({
        clientes
    })
})

router.get('/:id', async (req,res) => {
    const {id} =  req.params

    let cliente = await Clientes.findById(id)
    res.json ({cliente})

})

router.put('/', async(req, res) => {
    
    let {status, message} = validateCreate(req.body)
    if(status){
        return res.json({message}), 400;
    }else{
        console.log("Aqui va status y message: ",status, message);
    } 

    const {nombre, clave, correoE, productos, id} = req.body
    let cliente = await Clientes.findByIdAndUpdate(
    
        id,
        {
        
            $set:{
                nombre,
                clave,
                correoE,
                productos
            }
        },
        {new: true}
    )
    res.json({cliente})
} )

router.delete('/:clienteId', async(req, res) => {
    const clienteId = req.params.clienteId

    await Clientes.findByIdAndDelete( 
        clienteId
    )
    res.json({"Mensaje": "Cliente eliminado"})
} )


router.patch('/:clienteId', async(req, res) => {

    let {status, message} = validateCreate(req.body)
    if(status){
        return res.json({message}), 400;
    }else{
        console.log("Aqui va status y message: ",status, message);
    }

    const {nombre, clave, correoE, productos, id} = req.body
    let cliente = await Clientes.findByIdAndUpdate(
    
        id,
        {
        
            $set:{
                nombre,
                clave,
                correoE,
                productos
            }
        },
        {new: true}
    )
    res.json({cliente})
    })

router.post('/',async (req, res) => {
    
    let {status, message} = validateCreate(req.body)
    if(status){
        return res.json({message}), 400;
    }else{
        console.log("Aqui va status y message: ",status, message);
    }

    const body = req.body

    const cliente = new Clientes({
        nombre : body.nombre,
        clave : body.clave,
        correoE : body.correoE,
        productos : body.productos
    })
    
    await cliente.save()
    return res.json({cliente})
})

module.exports = router
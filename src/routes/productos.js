const express = require('express')
const Productos = require('../schema/productos')
const { validateCreate } = require('../validaciones/productos')
const router = express.Router()

router.get('/', (req, res) => {
    Productos.find()

    .then(productosarray => {
    res.json({productosarray})
    })
    .catch(err => 
        {
            res.json({"Error " :"Error de servidor en Productos"}),500
        })

})

router.get('/:id', (req, res) => {
    const {id} = req.params
    console.log(id)
    Productos.findById (id)
    .then(producto => {
        res.json({producto})
    })
    .catch(err => {
        res.json({err})
    })
})

router.put('/', (req, res) => {
    let {status, message} = validateCreate(req.body)
    if(status){
        return res.json({message}), 400; 
    }else{
        console.log("Aqui va status y message: ",status, message);
    }  
    const body = req.body
    const{clave, precio, impuestos} = req.body
    Productos.findByIdAndUpdate(

        body.id,

        {
            $set:{
                nombre : body.nombre, 
                clave ,
                precio ,
                impuestos
                
            }
        },{
            new: true 
        }
    )
    .then (() => {
        
        res.json({Mensaje: "Producto Actualizado"}),205
    })
    .catch ((error) => {
        res.json({error})
    })

})

    router.patch('/:id', (req,res) => {
    let {status, message} = validateCreate(req.body)
    if(status){
        return res.json({message}), 400;
    }else{
        console.log("Aqui va status y message: ",status, message);
    }  
    const id = req.params.id

    const {
        nombre, clave, precio, impuestos
    } = req.body
    Productos.findByIdAndUpdate (
        id,
        {
        $set: {
            nombre,
            clave,
            precio,
            impuestos
        }
    }, {
        new: true
    }
    )
    .then(() => {
    res.json({"Mensaje": "Registro de productos actualizado"}),200
    })

    .catch((err) => {
    res.json({ "Mensaje": err})
    })
    })

    router.delete('/:productId', (req, res)=> {
    const productId = req.params.productId

    Productos.findByIdAndDelete(
        productId
        )
        .then(()=> {
            res.json({"Mensaje" : "Producto eliminado"}),200
        })
        .catch((err)=> {
            res.json({err})
        })
    })

router.post('/', (req, res) => {
    let {status, message} = validateCreate(req.body)
    if(status){
        return res.json({message}), 400;
    }else{
        console.log("Aqui va status y message: ",!status, message);
    }  
    const body = req.body
    console.log(body.nombre)
    const producto = new Productos({
        nombre : body.nombre,
        clave : body.clave,
        precio : body.precio,
        impuestos : body.impuestos, 
    })
    producto.save()
    return res.json({producto}),205
})

module.exports = router

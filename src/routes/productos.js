const express = require('express')
const Productos = require('../schema/productos')
const router = express.Router()


router.get('/', (req, res) => {

    res.json({
        Hello : 'Mundo'
    })
})

router.post('/',async (req, res) => {
    const body = req.body
    console.log(body.nombre)
     const producto = new Productos({
        nombre : body.nombre,
        clave : body.clave,
        precio : body.precio,
        impuestos : body.impuestos,
    })
    producto.save()
    return res.json({producto})
})

module.exports = router
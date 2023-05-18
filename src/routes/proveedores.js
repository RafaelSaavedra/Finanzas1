const express = require('express')
const Proveedores = require('../schema/proveedores')
const router = express.Router()


router.get('/', (req, res) => {

    res.json({
        Hello : 'Mundo Proveedores'
    })
})

router.post('/',async (req, res) => {
    const body = req.body
    console.log(body.nombre)
     const proveedor = new Proveedores({
        nombre : body.nombre,
        clave : body.clave,

    })
    proveedor.save()
    return res.json({proveedor})
})

module.exports = router
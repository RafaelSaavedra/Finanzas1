const express = require('express')
const Ingresos = require('../schema/ingresos')
const router = express.Router()


router.get('/', (req, res) => {

    res.json({
        Hello : 'Mundo Ingresos'
    })
})

router.post('/',async (req, res) => {
    const body = req.body
    console.log(body.nombre)
     const ingreso = new Ingresos({
        fecha : body.fecha,
        factura : body.factura,
        cliente : body.cliente,
        producto : body.producto,
        claveProducto : body.claveProducto,
        precio : body.precio,
        cantidad : body.cantidad,
        total : body.total,
        impuestos : body.impuestos,
        credito : body.credito,
        status : body.status
    })
    ingreso.save()
    return res.json({ingreso})
})

module.exports = router
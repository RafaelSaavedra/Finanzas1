const express = require('express')
const Egresos = require('../schema/egresos')
const router = express.Router()

router.get('/', (req, res) => {

    res.json({
        Holaaa : 'Mundo Egresos'
    })
})

router.post('/',async (req, res) => {
    const body = req.body
    console.log(body.nombre)
     const egreso = new Egresos({
        fecha : body.fecha,
        factura : body.factura,
        proveedor : body.proveedor,
        matPrima : body.matPrima,
        claveMatPrima : body.claveMatPrima,
        precio : body.precio,
        cantidad : body.cantidad,
        total : body.total,
        impuestos : body.impuestos,
        credito : body.credito,
        status : body.status
    })
    egreso.save()
    return res.json({egreso})
})


module.exports = router
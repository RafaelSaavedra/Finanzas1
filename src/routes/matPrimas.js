const express = require('express')
const MatPrimas = require('../schema/matPrimas')
const router = express.Router()


router.get('/', (req, res) => {

    res.json({
        Hello : 'Mundo MatPrimas'
    })
})

router.post('/',async (req, res) => {
    const body = req.body
    console.log(body.nombre)
     const matPrima = new MatPrimas({
        nombre : body.nombre,
        clave : body.clave,
        precio : body.precio,
        impuestos : body.impuestos,
    })
    matPrima.save()
    return res.json({matPrima})
})

module.exports = router
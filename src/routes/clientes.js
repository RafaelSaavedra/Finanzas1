const express = require('express')
const Clientes = require('../schema/clientes')
const router = express.Router()


router.get('/', (req, res) => {

    res.json({
        Hello : 'Mundo Clientes'
    })
})

router.post('/',async (req, res) => {
    const body = req.body
    console.log(body.nombre)
     const cliente = new Clientes({
        nombre : body.nombre,
        clave : body.clave,

    })
    cliente.save()
    return res.json({cliente})
})

module.exports = router
const express = require('express')
const Ingreso = require('../schema/ingresos')
const router = express.Router()


router.get('/', (req, res) => {

    res.json({
        Hello : 'Mundo'
    })
})

module.exports = router
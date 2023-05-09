const express = require('express')
const Egreso = require('../schema/egresos')
const router = express.Router()

router.get('/', (req, res) => {

    res.json({
        Holaaa : 'Mundo'
    })
})

module.exports = router
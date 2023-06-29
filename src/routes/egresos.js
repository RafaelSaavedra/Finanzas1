const express = require('express')
const Egresos = require('../schema/egresos')
const router = express.Router()

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

router.get('/', (req, res) => {
    //res.json({Holaaa : 'Mundo Egresos'})
    Egresos.find()
    .then(egresosArray => {
        res.json({egresosArray})
    })
    .catch(err => {
        res.json({"Error" : "Error de servidor en Egresos"})
    })
})

router.get('/:id', (req, res) => {
    //const egresosID = req.params.id
    const{id} = req.params
    console.log(id)
    Egresos.findById(id)

    .then(egreso => {
        res.json({egreso})
    })

    .catch(err => {
        res.json({err})
    })
} )

router.put('/', (req, res) =>{
    const body = req.body
    const{proveedor, matPrima, claveMatPrima,precio, cantidad, total, impuestos, credito, status} = req.body

    Egresos.findByIdAndUpdate(
        body.id,
        {
            $set:{
                factura : body.factura,
                proveedor,
                matPrima,
                claveMatPrima,
                precio,
                cantidad,
                total,
                impuestos,
                credito,
                status
            }
        },{
            new : true
        }
    )

    .then(() => {
       res.json({Mensaje: "Egreso Actualizado"}), 205
        
    })

    .catch ((error) => {
        res.json({error})
    })
    //res.json({body})
})

router.patch('/:egresoId', (req, res)=> {
    const egresoId = req.params.egresoId
    const{factura,proveedor,matPrima,claveMatPrima,precio,cantidad,total,impuestos,credito,status}= req.body

    Egresos.findByIdAndUpdate(
        egresoId,
        {$set:{
            factura,
                proveedor,
                matPrima,
                claveMatPrima,
                precio,
                cantidad,
                total,
                impuestos,
                credito,
                status

        }},{
            new: true
        })
        .then(()=>{
            res.json({"Mensaje":"Registro de Egresos Actualizado"}),200
        })
        .catch((err)=> {
            res.json({"Mensaje": err})
        })
    })

    router.delete('/:egresoId', (req,res)=> {
        const egresoId = req.params.egresoId
        Egresos.findByIdAndDelete(
            egresoId
        )
        .then(()=> {
            res.json({"Mensaje": "Egreso Eliminado"})
        })
        .catch((err)=> {
            res.json({err})
        })
    })

module.exports = router
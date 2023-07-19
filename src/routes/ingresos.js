const express = require('express')
const Ingresos = require('../schema/ingresos')
const router = express.Router()
const {validateCreate} = require('../validaciones/ingresos')

router.post('/', (req, res) => {

        let {status1, message} = validateCreate(req.body)
        if (status1){
            return res.json({message}),400
        }else{
            console.log("Aqui va status y message: ",status1, message);
        } 

        const body = req.body
        const ingreso = new Ingresos({
        
            factura : body.factura,
            cliente : body.cliente,
            producto : body.producto,
            claveProducto : body.claveProducto,
            precio : body.precio,
            cantidad : body.cantidad,
            total : body.precioTotal,
            impuestos : body.impuestos,
            credito : body.credito,
            status : body.status
        }) 
        
        ingreso.save()
        return res.json({ingreso})
    

}) 



router.get('/', (req, res) => {
    //res.json({Hello : 'Mundo Ingresos'})

    Ingresos.find()
    .then(ingresosArray => {
        res.json({ingresosArray})
    })
    .catch(err => {
        res.json({"Error" : "Error de servidor en Ingresos"})
    })
})

router.get ('/:id', (req, res) => {
    //const ingresosId = req.params.id
    const{id} = req.params
    Ingresos.findById(id)
    
    .then (ingreso => {
        res.json({ingreso})
    })

    .catch (err => {
        res.json({err})
    })
})

router.put('/', (req, res) => {

   

    const {status1, message} = validateCreate(req.body)
    if (status1){
        res.json({"Mensaje" : message}),400
    }else{
        console.log("Aqui va status y message: ",status1, message);
    } 

    const body = req.body
    const{cliente, producto, claveProducto, precio, cantidad, precioTotal, impuestos, credito, status} = req.body

    

    Ingresos.findByIdAndUpdate(
        body.id,
        {
            $set:{
                factura : body.factura,
                cliente,
                producto,
                claveProducto,
                precio,
                cantidad,
                precioTotal,
                impuestos,
                credito,
                status
            }
        },{
            new : true
        }
    )

    .then(() => {
        res.json({Mensaje : "Ingreso actualizado"}), 205
    })
    .catch((error) => {
        res.json({error})
    })
})

router.patch ('/:ingresoId', (req, res)=> {

    

    const {status1, message} = validateCreate(req.body)
    if (status1){
        res.json({"Mensaje" : message}),400
    }else{
        console.log("Aqui va status y message: ",status1, message);
    } 

    const body = req.body
    const ingresoId = req.params.ingresoId
    const {factura,cliente,producto,claveProducto,precio,cantidad,precioTotal,impuestos,credito,status}= req.body

    Ingresos.findByIdAndUpdate(
        ingresoId,
        {$set:{
            factura,
                cliente,
                producto,
                claveProducto,
                precio,
                cantidad,
                precioTotal,
                impuestos,
                credito,
                status
        }},{
            new: true
        }
    )
    .then(()=> {
        res.json({"Mensaje":"Registro de Ingresos actualizado"}),200
    })
    .catch((err)=> {
        res.json({"Mensaje": err})
    })
}) 

router.delete('/:ingresoId', (req, res)=> {
    const ingresoId = req.params.ingresoId
    Ingresos.findByIdAndDelete(
        ingresoId
    )
    .then(()=>{
        res.json({"Mensaje":"Ingreso eliminado"}),200
    })
    .catch((err)=> {
        res.json({err})
    })
})


module.exports = router
const express = require('express')
const Egresos = require('../schema/egresos')
const {validateCreate} = require('../validaciones/egresos')
const router = express.Router() 

router.post('/',async (req, res) => {

    const {status1, message} = validateCreate(req.body)
    if (status1){
        res.json({"Mensaje" : message}),400
    }else{
        console.log("Aqui va status y message: ",status1, message);
    } 
 
    const body = req.body   

    const egreso = new Egresos({  
        fecha : body.fecha,
        factura : body.factura,
        proveedor : body.proveedor,
        materiaPrima : body.materiaPrima,
        claveMatPrima : body.claveMatPrima ,
        precio : body.precio,
        cantidad : body.cantidad,
        precioTotal : body.precioTotal,
        impuestos : body.impuestos,
        credito : body.credito,   
        status : body.status
    })
    
    
    await egreso.save()
    
    return res.json({egreso})
})

router.get('/', (req, res) => {

    Egresos.find()
    .then(egresosArray => {
        res.json({egresosArray})
    })
    .catch(err => {
        res.json({"Error" : "Error de servidor en Egresos"})
    })
})

router.get('/:id', (req, res) => {

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

    const {status1, message} = validateCreate(req.body)
    if (status1){
        return res.json({"Mensaje" : message}),400
    }else{
        console.log("Aqui va status y message: ", status1, message);
    }

    const body = req.body   
    const{proveedor, materiaPrima, claveMatPrima,precio, cantidad, precioTotal, impuestos, credito, status, id} = req.body

    Egresos.findByIdAndUpdate(
    
        id,
        {
            $set:{
                factura : body.factura,
                proveedor,
                materiaPrima,
                claveMatPrima,
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
    res.json({Mensaje: "Egreso Actualizado"}), 205
        
    })

    .catch ((error) => {
        res.json({error})
    })

})

router.patch('/:egresoId', (req, res)=> {

    const {status1, message} = validateCreate(req.body)
    if (status1){
        return res.json({"Mensaje" : message}),400
    }else{
        console.log("Aqui va status y message: ", status1, message);
    } 

    const egresoId = req.params.egresoId
    const{factura,proveedor,materiaPrima,claveMatPrima,precio,cantidad,precioTotal,impuestos,credito,status}= req.body

    Egresos.findByIdAndUpdate(
        egresoId,
        {$set:{
            factura,
                proveedor,
                materiaPrima,
                claveMatPrima,
                precio,
                cantidad,
                precioTotal,
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
const express = require('express')
const MatPrimas = require('../schema/matPrimas')
const { validateCreate } = require('../validaciones/matPrimas')
const router = express.Router()


router.post('/', (req, res) => {
    
    let {status, message} = validateCreate(req.body)
    if(status){
        return res.json({message}), 400;
    }else{
        console.log("Aqui va status y message: ",status, message);
    }   
    
    const body = req.body
    //console.log(body.nombre)
     const matPrima = new MatPrimas({
        nombre : body.nombre,
        clave : body.clave,
        precio : body.precio,
        impuestos : body.impuestos,
    })
    matPrima.save()
    return res.json({matPrima})
})

router.get('/', (req, res) => {
    //res.json({ Hello : 'Mundo MatPrimas' })
    MatPrimas.find()
    .then(matPrimasarray => {
        res.json({matPrimasarray})
    }) 
    .catch(err => {
        res.json({"Error" : "Error de servidor en MatPrimas"}), 500
    })
})

router.get('/:id', (req, res) => {
    //const matPrimasId = req.params.id
    const{id} = req.params
    //console.log (id)
    MatPrimas.findById (id)
    .then(matPrima => {
        res.json ({matPrima})
    })
    .catch(err => {
        res.json({err})
    })
})

router.put('/', (req,res) => {
    
    let {status, message} = validateCreate(req.body)
    if(status){
        return res.json({message}), 400;
    }else{
        console.log("Aqui va status y message: ",status, message);
        const body = req.body
        const{clave, precio, impuestos} = req.body
        MatPrimas.findByIdAndUpdate(
        body.id,
        {
            $set:{
            nombre : body.nombre,
            clave,
            precio,
            impuestos    
            }
        },{
        new:true
        })
        .then (() => {
            //res.json({Mensaje:"MatPrima actualizada"}),205
            res.json({body})
        })
        .catch ((error) => {
            res.json({error})
        })
        //res.json({body})
    }  
    
}) 

router.patch('/:matPrimaId', (req,res) => {
    
    let {status, message} = validateCreate(req.body)
    if(status){
        return res.json({message}), 400;
    }else{
        console.log("Aqui va status y message: ",status, message);
    }  

    const matPrimaId = req.params.matPrimaId
    const {
        nombre, clave, precio, impuestos
    } = req.body
    MatPrimas.findByIdAndUpdate (
        matPrimaId,
         {
        $set: {
            nombre,
            clave,
            precio,
            impuestos
        }
    }, {
        new: true
    })
   .then(() => {
    res.json({"Mensaje": "Registro de Materias primas actualizado"}),200
   })
   .catch((err) => {
    res.json({ "Mensaje": err})
   })
})

router.delete('/:matPrimaId', (req, res) =>{   
    //const matPrimaId = req.query.matPrimaId
    const matPrimaId = req.params.matPrimaId
    MatPrimas.findByIdAndDelete(
        matPrimaId
        )
        .then(()=> {
            res.json({"Mensaje" : "Materia Prima eliminada"}),200
        })
        .catch((err)=> {
            res.json({err})
        })
    })




module.exports = router
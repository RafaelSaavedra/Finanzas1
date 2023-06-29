const express = require('express')
const Clientes = require('../schema/clientes')
const router = express.Router()

//Aqui con get obtenemos la lista de clientes y el async/await nos omite la promesa y hace esperar a que se realize el find de los clientes
router.get('/', async (req, res) => {
    let clientes = await Clientes.find()
    res.json({
        clientes
    })
})

router.get('/:id', async (req,res) => {
    const {id} =  req.params

    let cliente = await Clientes.findById(id)
    res.json ({cliente})

})

router.put('/', async(req, res) => {
    const {nombre, clave, productos, id} = req.body
    let cliente = await Clientes.findByIdAndUpdate(
       // req.body.id  EN ESTE PUNTO YA NO REQUIERO EL BODY.ID PORQUE LO PEDI DESDE LA LINEA 14
        id,
        {
            // este tipo de objeto nos va a ayudar a la actualizacion:
            $set:{
                nombre,
                clave,
                productos
            }
        },
        {new: true}
    )
    res.json({cliente})
} )

router.delete('/:clienteId', async(req, res) => {
    const clienteId = req.params.clienteId
    //definir una constante cliente ya no es necesario en este punto p
    //let cliente = await Clientes.findByIdAndDelete(
    await Clientes.findByIdAndDelete( 
        clienteId
    )
    res.json({"Mensaje": "Cliente eliminado"})
} )


router.patch('/:clienteId', async(req, res) => {
    const {nombre, clave, productos, id} = req.body
    let cliente = await Clientes.findByIdAndUpdate(
       // req.body.id en este punto ya no req.bodyId porque lo pedí desde linea 32 
        id,
        {
            // este tipo de objeto nos va a ayudar a la actualizacion:
            $set:{
                nombre,
                clave,
                productos
            }
        },
        {new: true}
    )
    res.json({cliente})
    })

// Con POST creamos un nuevo elemento en la base de datos
router.post('/',async (req, res) => {
    const body = req.body
    console.log(body.nombre)
    const cliente = new Clientes({
        nombre : body.nombre,
        clave : body.clave,
        // En esta parte solo se pasa el id del producto y los va juntando
        productos : body.productos
    })
    //El await se ocupa cuando hacemos acciones y en este caso usar el metodo save para guardar
    await cliente.save()
    return res.json({cliente})
})



module.exports = router
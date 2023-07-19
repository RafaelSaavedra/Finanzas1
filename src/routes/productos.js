//las librerias que se ocupan
//Express nos ayudará a crear rutas para consumir nuestras apis
const express = require('express')
//Este exporta el esquema que se ocupará para hacer el CRUD de productos esto quiere decir que lo ocuparemos para manipular la base de datos
const Productos = require('../schema/productos')
const { validateCreate } = require('../validaciones/productos')
//Esto nos ayuda a crear las rutas y ponerles de que tipo sea por ej get, post, put, patch, delete
const router = express.Router()

// crea una ruta tipo GET que recibe los parámetros, req = requerimientos, esto significa que es lo que nos va a mandar el cliente. res= response, esto significa lo que nosotros vamos a mandar al cliente
router.get('/', (req, res) => {
//Productos hace referencia  al esquema que se encuentra en la base de datos
//find es una función que nos va a traer todos los objetos de Productos que estén registrados en la base de datos
//Esto nos va a regresar una promesa
    Productos.find()
   //si la promesa es correcta, va a ser lo siguiente 
    .then(productosarray => {
    //realizará una respuesta del tipo json que tendrá todos los productos existentes
    // si no se encuentra nada de registro, nos regresará un arreglo vacío []
        res.json({productosarray})
    })
    //Este es un ejemplo solo para representar si hay error, en este caso, el catch no es necesario porque productos existe y si no existiera, desde la importación nos traería errores
    //si la promesa es incorrecta, va a hacer lo siguiente:
    .catch(err => 
        {
        //regresaremos una respuesta del tipo json indicando mensaje de que ha habido un error en productos
        //se manda a través de un objeto
            res.json({"Error " :"Error de servidor en Productos"}),500
        })

   })
// crearemos una ruta del tipo GET, esta misma recibirá un parámetro por la url llamado id, este nombre puede declararse como uno lo desee, pero las buenas prácticas nos dicen que toda variable declarada debe de llamarse con fin de que haga referencia a qué se va a ocupar
//para poner una variable en la url, se debe de poner : y el nombre de la variable
   router.get('/:id', (req, res) => {
    //las siguientes constantes son ejemplos para poder extraer una variable del url
    //const productoId = req.params.id 
    //la facilidad de declarar esta variable es que nos ayuda a ocupar solamente un req.params para todas las variables que tenemos dentro de la url
    //ejemplo: /:name/:id/:status/:key
    //const {name,id,status,key} = req.params
    //este se ocupa con este tipo de declaración de la otra manera sería:
    /*
    const name = req.params.name
    const status = req.params.status
    const id = req.params.id
    const key = req.params.key
    esta forma es mas larga */
    const {id} = req.params
    console.log(id)
    //Productos hace referencia al esquema de productos
    //findById esta función nos ayuda a buscar un registro a través del id, este mismo nos regresara una promesa
    Productos.findById (id)
    //si lo que contiene  es correcto hará lo siguiente:
    .then(producto => {
        // aquí te regresa el objeto de producto que yo quería y si no encuentra ninguno regresa un objeto vacío
        res.json({producto})
    })
   // si hay algún error en lo que contiene la función te da el aviso de error
    .catch(err => {
        //aqui te entrega json indicandote el error
        res.json({err})
    })
   })
//el router te ayuda a generar las rutas de acceso y el tipo de petición, si la ruta está registrada y la reconoce el router te manda el resultado
//el put te ayuda a actualizar un registro específico que deseas cambiar, es igual que el patch
//TAREA investigar que es un get, un post, un delete, un put y un patch
//TAREA ejemplos de cada uno
//TAREA etudiar los status de respuesta de un API
 
   router.put('/', (req, res) => {
    //Con esta funcion haremos validaciones, asegurarnos de que se escriban correctamente los reqs
    let {status, message} = validateCreate(req.body)
    if(status){
        return res.json({message}), 400; 
    }else{
        console.log("Aqui va status y message: ",status, message);
    }  
    //Como buenas practicas, cuando se pide un objeto o varios parametros, se piden a través de un body, normalmente se ocupa en post, put y patch
    //las siguientes dos formas se ocupan para extraer la información del body así como el mismo ejemplo del params
    //body lo extraemos como un objeto y vamos a extraer su información como tal, así como la linea 75 y 78
    const body = req.body
    //de esta manera etraemos la información del body nombrando por variables especificas de lo que contiene body, aqui estamos filtrando para pedir sólo lo que nos interesa
    const{clave, precio, impuestos} = req.body
    //Productos es una referencia del esquema
    // findBy IdAndUpdate este busca a traves del registro de productos al que haga referencia al que ya tenemos en la base de datos, si no existe esa id regresa un error
    //esta función nos regresa una promesa
    Productos.findByIdAndUpdate(

        //esta función recibe dos parametros, el primero es el id del registro a actulizar y el segundo es un objeto que contiene $set que contiene los valores de un objeto por los cuales se van a cambiar
        body.id,

        {
            //este set hace referencia a lo que vamos a actualizar del registro
            $set:{
                nombre : body.nombre, 
                clave ,
                precio ,
                impuestos
                
            }
        },{
            //le decimos que sí haga el cambio
            new: true 
        }
    )
// si esto esta correcto nos regresa la informacion
    .then (() => {
        
        res.json({Mensaje: "Producto Actualizado"}),205
        //res.json({body})
    })
    .catch ((error) => {
        res.json({error})
    })
    /*
    res.json({
        body
    })
*/
   })
//Este es sloamente un ejemplo de como se toma informacion de la url
   router.get('/:productId/prueba',(req, res) => {
    //lo que nos llega del params, cuando declaremos una variable debe ser igual a como lo hemos llamado en la url así como la siguiente variable
    //esto no es una promesa, solamente es sacar la informacion de una url
    const productId = req.params.productId
    res.json({"Variable que nos llega por la url": productId})
   })
   //El router nos apoya para establrcer las rutas, El patch es un método que nos ayudará a actualizar ciertos parametros en específico
   //los : indican que vamos a poner una variable en la url y el nombre que pongamos ahí lo deberemos seguir usando para pedir los parametros
   //Req recibe la petición del cliente y res es la respuesta que da el servidor

   router.patch('/:productId', (req,res) => {
    //Aqui validamos el req antes de ejecutar la peticion
    let {status, message} = validateCreate(req.body)
    if(status){
        return res.json({message}), 400;
    }else{
        console.log("Aqui va status y message: ",status, message);
    }  
    //la constante productId es la que va a recibir los parametros de la url
    const productId = req.params.productId
    //la constante que recibe todos los componentes del body nos la da req.body
    const {
        nombre, clave, precio, impuestos
    } = req.body
    //findByIdAndUpdate localiza de acuerdo al id que le dimos y actualiza alos nuevos valores que enviamos a través de $set
    Productos.findByIdAndUpdate (
        productId,
         {
        $set: {
            nombre,
            clave,
            precio,
            impuestos
        }
    }, {
        //Aqui le confirmamos que guarde los nuevos valores
        new: true
    }
    )
    //esta es la respuesta a la promesa si todo estuvo correcto
   .then(() => {
    res.json({"Mensaje": "Registro de productos actualizado"}),200
   })

   //el numero 200 s la representacion de que todo ha salido bien, podríamos quitarlo porque por defecto ya lo manda
   //si hay algún error se va a catch
   .catch((err) => {
    res.json({ "Mensaje": err})
   })
   })

//Asi debe ser la ruta cuando se quiere sacar el valor por query, esta es otra forma para sacar informacion a través de la url
//pongaSuIdAqui/?productId=647157463ba5dc51c099b198
   router.delete('/:productId', (req, res)=> {
    //  /pongaSuIdAqui, solo es una representación y no se debe hacer en ambientes productivos
   // router.delete('/', (req, res) =>{
       // router.delete('/pongaSuIdAqui',(req,res)=> {
    const productId = req.params.productId
    //para tomar la query, en la ruta se debe poner un signo de interrogacion y ya despues el nombre de la variable, en este caso, se llama: productId
    //const productId = req.query.productId
    //Aquí ya aplicamos el método de findByIdAndDelete que recibe el productId y con eso ya elimina todo

    Productos.findByIdAndDelete(
        productId
        )
//Aqui nos regresa una promesa si está correcta elimina el producto
        .then(()=> {
            res.json({"Mensaje" : "Producto eliminado"}),200
        })
        .catch((err)=> {
            res.json({err})
        })
    })
   

//Este metodo crea un nuevo producto
router.post('/', (req, res) => {
    let {status, message} = validateCreate(req.body)
    if(status){
        return res.json({message}), 400;
    }else{
        console.log("Aqui va status y message: ",status, message);
    }  
    //Para hacer el post defines una constante que va a ser el cuerpo del producto
    const body = req.body
    console.log(body.nombre)
    //Aqui creas un nuevo objeto del schema de productos
     const producto = new Productos({
        nombre : body.nombre,
        clave : body.clave,
        precio : body.precio,
        impuestos : body.impuestos, 
    })
    //Aqui le pides que guarde ese objeto en la base de datos
    producto.save()
    //Aqui le pido que nos envíe el objeto
    //el 205 solo se ocupa en este caso que es para crear un registro en la base de datos
    return res.json({producto}),205
})

//Esto es para exportar todos los métodos que creamos dentro de router
module.exports = router

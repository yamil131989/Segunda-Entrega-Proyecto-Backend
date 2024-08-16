const express       = require('express')
const logger        = require('morgan')

const cartRouter = require('./routes/carts.router.js')
const productRouter = require('./routes/products.router.js')
const views = require('./routes/views.router.js')

//const viewsRouter = require('./routes/views.router.js')
const ProductsManagerFs = require('./managers/FileSystem/products.manager.js')
const prodManagerFs = new ProductsManagerFs()

//SOCKET ******************************
const {Server} = require('socket.io')
const {engine} = require('express-handlebars')
//******************************************* */

const app = express()
const PORT = 8080


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(logger('dev'))

app.engine('handlebars',engine())
app.set('view engine','handlebars')
app.set('views',__dirname+'/views')

// endpoint

//app.use('/',viewsRouter) //ver
app.use('/api/products', productRouter)
app.use('/api/carts',cartRouter)
app.use('/', views)




app.use((error, req, res, next) => {
    console.log(error.stack)
    res.status(500).send('error de server')
})



const expressServer = app.listen(PORT,()=>{
    console.log(`Listening :,${PORT}`)
})

const socketServer = new Server(expressServer)

socketServer.on('connection', socket=>{
    console.log("Cliente Conectado")
    const productos =  prodManagerFs.getProducts()
    socket.emit('productos',productos)
})


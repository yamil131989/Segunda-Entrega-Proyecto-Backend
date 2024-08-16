const express       = require('express')
const productRouter = require('./routes/products.router.js')
const cartRouter = require('./routes/carts.router.js')
const logger        = require('morgan')
const {engine} = require('express-handlebars')
//const viewsRouter = require('./routes/views.router.js')



//SOCKET ******************************
const {Server, Socket } = require('socket.io')
//******************************************* */

const app = express()
const PORT = 8080


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/public'))
app.use(logger('dev'))



// endpoint

//app.use('/',viewsRouter) //ver
app.use('/api/products', productRouter)
app.use('/api/carts',cartRouter)

app.engine('handlebars',engine())
app.set('views',__dirname+'./views')
app.set('view engine','handlebars')

app.get('/', (req,res) => {
    return res.render('home')
})

app.use((error, req, res, next) => {
    console.log(error.stack)
    res.status(500).send('error de server')
})

// app.listen(PORT, () => {
//     console.log('escuchando en el puerto: ', PORT)
// })

const expressServer = app.listen(PORT,()=>{
    console.log('Listening :',PORT)
})

const socketServer = new Server(expressServer)
//const io = new Server(httpServer)
socketServer.on('connection',socket=>{
    console.log("Cliente Conectado")
})


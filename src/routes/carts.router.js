const { Router } = require('express')
const CartManagerFs = require('../managers/FileSystem/carts.manager.js')
const ProductsManagerFs = require('../managers/FileSystem/products.manager.js')

const router = Router()

const croductsManagerFs = new ProductsManagerFs
const cartManagerFS = new CartManagerFs

//POST /api/carts/
//GET /:cid
//POST /:cid/product/:pid 

router.get('/', async (req,res)=>{    
    try {
        const carritos = await cartManagerFS.getCarts()
        res.send({status:'success', data: carritos})    
    } catch (error) {
        
    }
    
})

router.post('/', async (req,res)=>{
    try {        
        const response = await cartManagerFS.addCarts()
        res.send({status:'success',data:response})
        
    } catch (error) {
        console.log(error)
    }
})

router.get('/:cid', async (req,res)=>{    
    try {
        let id = req.params.cid
        const cart = await cartManagerFS.getCartsbyId(id)
        if(cart){
            res.send({status:'success', data: cart})    
        } else {
            res.sendStatus(404,"No se encuentra")
        }
    } catch (error) {
        console.log(error)
    }
    
})


router.post('/:cid/products/:pid', async (req,res)=>{
    try {                
        const cartId = req.params.cid
        const prodId = req.params.pid
        
        let producto = await croductsManagerFs.getProduct(prodId)
        if(!producto)res.sendStatus(404,"Producto no se encuentra")
        let carrito =  await cartManagerFS.getCartsbyId(cartId)    
        if(!carrito)res.sendStatus(404,"Carrito no se encuentra")

        const respuesta = await cartManagerFS.addProductToCart(cartId,prodId)
        res.send({status:'success',data:respuesta})
    } catch (error) {
        console.log(error)
    }
})

// GET /:cid

module.exports = router

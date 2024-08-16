const { Router } = require('express')
const { error } = require('console')
const ProductsManagerFs = require('../managers/FileSystem/products.manager')


const router = Router()

const prodManagerFS = new ProductsManagerFs



router.get('/', async (req, res)=>{
    try {
        const {limit} = req.query
        const productsDb = await prodManagerFS.getProducts(limit)
        res.send({status:'success', data: productsDb})
    } catch (error) {    
        console.log(error)
    }
        
})
router.get('/:id', async (req, res)=>{
    try {
        let id = req.params.id
        const respuesta = await prodManagerFS.getProduct(id)        
        if(respuesta){

            res.send({status:'success', data:respuesta})
        } else {
           
            res.sendStatus(404,"No se encontro")
        }
    } catch (error) {
        console.log(error)
    }                
})


router.post('/',async(req,res)=>{
    try {
        const {body} = req
        const response = await prodManagerFS.createProduct(body)
        res.send({status:'success',data:response})
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id',async (req,res)=>{
    try {
        let id = req.params.id
        const respuesta = await prodManagerFS.getProduct(id)
        if(respuesta){
            let producto = req.body
            let response = await prodManagerFS.updateProduct(id,producto)       
            res.send({status:'success', data:response})
        } else {
            res.sendStatus(404,"No se encontro")
        }
        
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id',async (req,res)=>{
    try {
        let id = req.params.id
        res.send({status:'success',data:await prodManagerFS.deleteProduct(id)})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router




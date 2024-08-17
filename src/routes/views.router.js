const { Router } = require('express')
const ProductsManagerFs = require('../managers/FileSystem/products.manager')

const router = Router()

const prodManagerFS = new ProductsManagerFs()

router.get('/',async (req,res)=>{
    const productos = await prodManagerFS.getProducts()  
    //console.log({productos})  
    return res.render('home',{productos,styles:"styles.css"})
})
 
router.get('/realtimeproducts',async (req,res)=>{
    const productos = await prodManagerFS.getProductsWebsocket()  
    //console.log({productos})  
    //return res.render('realTimeProducts',{productos,styles:"styles.css"})
    return res.render('realTimeProducts',{productos,styles:"styles.css"})

})

module.exports = router;

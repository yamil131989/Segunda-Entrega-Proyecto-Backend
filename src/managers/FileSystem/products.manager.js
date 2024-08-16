
const { randomUUID } = require('crypto')
const fs = require('fs')
const { stringify } = require('querystring')
const path = './dbjson/productsdb.json'


class ProductsManagerFs {
   
    constructor(){ 
        this.path = path
    }
    readProducts = async ()=>{
        try {
            if(fs.existsSync(path)){
                const productsJson = await fs.promises.readFile(path,'utf-8')
                const productsJs = JSON.parse(productsJson)                
                return productsJs
            }
              
        } catch (error) {
            console.log(error)
            //return []  
        }
    }

    //agregado la funcionalidad limit
    getProducts = async (limit=0)=>{
        try {
            limit = Number(limit)            
            const products = await this.readProducts()
            if(limit>0)
                return products.slice(0,limit)    
            return products
        } catch (error) {
            console.log(error)
        }
                    
    }
        
   

    createProduct = async (newProduct) =>{             
        // if(
        //     !newProduct.title ||
        //     !newProduct.description ||
        //     !newProduct.code ||
        //     !newProduct.price ||
        //     !newProduct.status ||
        //     !newProduct.stock 
           
        // ){
        //     return ("Producto incompleto")
        // }
        try {           
                                             
            const products = await this.readProducts() 
            console.log(products)                 
            let uuid = randomUUID()
            newProduct.id = uuid
            const prodagregados = [...products,newProduct]
            console.log(prodagregados)    
            await fs.promises.writeFile(path,JSON.stringify(prodagregados,null,'\t')) //sobreescibimos en la ruta
            return newProduct 

           

        } catch (error) {
            console.log(error)
        }

    }
    getProduct = async (id)=>{
        try {            
            const productos = await this.readProducts()            
            let producto = productos.find(prod =>prod.id === id)                        
            if(producto){
                return producto
            } else {
                return false
            }

        } catch (error) {
            console.log(error)
        }
    } //buscar 1 producto especifico
    prodExiste = async (id)=> {
        const products = await this.readProducts()
        return products.find(prod => prod.id === id)
    }
    updateProduct = async (id,producto)=>{ 
        //leer los productos, buscar el prod por id ,eliminar el producto y pisar el dbjson
        try { 
                
            const productoAmodificar = await this.getProduct(id)             
            if(!productoAmodificar){
                return false
            }
            await this.deleteProduct(id)
            const products = await this.readProducts()                        
            productoAmodificar.title = producto.title
            productoAmodificar.description = producto.description
            productoAmodificar.code = producto.code
            productoAmodificar.price = producto.price
            productoAmodificar.status = producto.status
            productoAmodificar.stock += producto.stock

            const prodagregados = [...products,productoAmodificar]
            console.log(prodagregados)    
            await fs.promises.writeFile(path,JSON.stringify(prodagregados,null,'\t')) 
           
            }            
            catch (error) {
            console.log(error)
            }
    } 

    deleteProduct = async (id)=>{
        try {
            let productos = await this.readProducts()
            let prodExistentes = productos.some(prod=>prod.id === id)
            if (prodExistentes){
                let prodFiltrados = productos.filter(prod => prod.id != id)
                
                await fs.promises.writeFile(path,JSON.stringify(prodFiltrados,null,'\t'))
                return prodFiltrados
            } else {
                return "producto no encontrado"
            }
        } catch (error) {
            console.log(error)
        }
    } 

}


module.exports = ProductsManagerFs
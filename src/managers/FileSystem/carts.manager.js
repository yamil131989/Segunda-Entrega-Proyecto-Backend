const fs = require('fs') 
const { randomUUID } = require('crypto')
const pathprod = './dbjson/productsdb.json'

const ProductsManagerFs = require('./products.manager.js')

const productosPM = new ProductsManagerFs

class CartsManagerFs {
    constructor(){
        this.path = './dbjson/cartsdb.json'
    }
        
    getCarts = async ()=>{
        try {            
            const carts = await fs.promises.readFile(this.path,'utf-8')
            return JSON.parse(carts)                                               
        } catch (error) {
            console.log(error)
            return []  
        }
    }
             
    writeCarts = async (carts)  => {  
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(carts))              
        } catch (error) {
            console.log(error)
        }    
    } 
    addCarts = async () =>{
        const Carts = await this.getCarts()  
        const uuid = randomUUID()        
        const cartsConcat = [{id:uuid, productos : []},...Carts] 
        await this.writeCarts(cartsConcat)
        return "Carrito agregado"
    }
    
    getCartsbyId = async (id)=>{
        try {            
            const carts = await this.getCarts()
            const cart = carts.find(car => car.id ===id )
            if(cart){
                return cart
            }
            else {
                return false
            }
        } catch (error) {
            console.log(error)
            return []  
        }
    }
    addProductToCart = async (cid,pid) =>{
        try {
            const carrito = await this.getCartsbyId(cid)        
            const producto = await productosPM.getProduct(pid)
            const carts = await this.getCarts()        
            const carritofiltro = carts.filter( cart => carrito.id != pid)

            //busc mismo prod dentro del carrito para sumarle la cant de items
            if(carrito.productos.some(prod => prod.id === pid)){
                const prodenCarrito = carrito.productos.find(prod => prod.id === pid)
                prodenCarrito.cantidad + 1 
                const cartConcat = [prodenCarrito, ...carritofiltro]
                await this.writeCarts(cartConcat)
                return "Producto sumado correctamente"
            }
            const cartConcat = [{id:cid, productos: [{id:producto.id, quantity:1 }]}, ...carritofiltro]     
            
            
            await this.writeCarts(cartConcat)
            return "Producto agregado al carrito"

        } catch (error) {
            console.log(error)    
        }                   
        
    }
    



}


module.exports = CartsManagerFs

/*
[
                        (producto entero)
    {id:"",producs:[{productID:'1',quantity:100}]}
]
Agregar un nuevo carrito
POST http://localhost:8080/api/carts/

*/


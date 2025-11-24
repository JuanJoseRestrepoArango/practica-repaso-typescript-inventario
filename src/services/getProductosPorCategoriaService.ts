import {productos} from "../data/info"
import {Producto} from "../domain/entities/producto"


export const getProductosPorCategoria = async(categoria:string) : Promise<Producto[]> => {
    console.log("Entre a getProductosPorCategoriaService")

    //Se crea la promesa y se genera la latencia con setTimeout
    const promise:Promise<Producto[]> = new Promise((resolve,reject) =>{
        setTimeout(()=>{
            const productosPorCategoria = productos.filter(prod => prod.categoria === categoria)
            if (productosPorCategoria.length > 0){
                resolve(productosPorCategoria)
            }else{
                reject(`No se encontraron productos en la categoría ${categoria}`)
            }
        },1000)
    })

    return promise
}
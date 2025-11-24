import { productos } from "../data/info.js";
export const getProductoService = async (id) => {
    console.log("Entre a getProductoService");
    //Se crea la promesa y se simula la latencia con un setTimeout
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const producto = productos.find(prod => prod.id === id)?.nombre;
            if (producto) {
                resolve(producto);
            }
            else {
                reject(`Producto no encontrado con id ${id}`);
            }
        }, 800);
    });
    return promise;
};

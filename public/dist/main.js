import { getProductoService } from "./services/getProductoService.js";
import { getProductosPorCategoria } from "./services/getProductosPorCategoriaService.js";
const productId = document.getElementById("productId");
const productsCat = document.getElementById("productsCat");
const result = document.getElementById("result");
const getIdFromButton = () => {
    console.log("Entre a getIdFromButton");
    const input = prompt("Ingresa el id del producto: ");
    const id = Number(input);
    if (isNaN(id)) {
        alert("El id debe ser un número");
        return;
    }
    return id;
};
const getCategoriaFromButton = () => {
    console.log("Entre a getCategoriaFromButton");
    const input = prompt("Ingrese la categoria de los productos: ");
    const categoria = input?.trim();
    if (!categoria || categoria.length === 0) {
        alert("Debe ingresar una categoria");
        return;
    }
    return categoria;
};
const mostrarProductoThenCatch = (id) => {
    console.log("Entre a mostrarProductoThenCatch");
    getProductoService(id).then((producto) => {
        console.log("Entro a then");
        result.innerHTML = "";
        console.log(producto, " Producto");
        result.textContent = `Producto: ${producto}`;
    }).catch((error) => {
        console.log("Entro a catch");
        console.error(error, " Error");
        result.textContent = error instanceof Error ? error.message : "Error Inesperado";
    });
};
const mostrarProductoAsincAwait = async (categoria) => {
    console.log("Entre a mostrarProductoAsincAwait");
    try {
        const productos = await getProductosPorCategoria(categoria);
        console.table(productos);
        result.innerHTML = "";
        productos.forEach(pod => {
            const p = document.createElement("p");
            p.textContent = `ID: ${pod.id} - Nombre: ${pod.nombre} - Categoria: ${pod.categoria} - Stock: ${pod.stock}`;
            result.appendChild(p);
        });
    }
    catch (error) {
        console.error(error, " Error");
        result.textContent = error instanceof Error ? error.message : "Error Inesperado";
    }
};
productId.addEventListener("click", () => {
    console.log("Click en botón por ID");
    try {
        const id = getIdFromButton();
        if (id !== undefined) {
            mostrarProductoThenCatch(id);
        }
    }
    catch (error) {
        result.textContent = error instanceof Error ? error.message : "Error Inesperado";
    }
});
productsCat.addEventListener("click", () => {
    console.log("Click en botón por Categoria");
    try {
        const categoria = getCategoriaFromButton();
        if (categoria && categoria.length !== 0) {
            mostrarProductoAsincAwait(categoria);
        }
    }
    catch (error) {
        result.textContent = error instanceof Error ? error.message : "Error Inesperado";
    }
});

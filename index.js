import ProductManager from './managers/ProductManager.js';

const productManager = new ProductManager('./files/Productos.json');

const start = async () => {
    let productos = await productManager.getProducts();
    console.log(productos);

    const producto = {
        title: "producto prueba VII",
        description: "Este es un producto prueba VII",
        price: 210,
        thumbnail: "Sin Foto",
        code: "abc12",
        stock: 12
    };

    //await productManager.addProducts(producto);

    const productosActual = await productManager.getProducts();
    console.log(productosActual);

    const productoId = await productManager.getProductById(22);
    console.log(productoId);

    const productUpdate = {
        title: "Este es un producto prueba VII",
        description: "Este es un producto prueba VII",
        price: 220,
        thumbnail: "sin Foto",
        code: "xyz9887",
        stock: 52
    };

    await productManager.updateProduct(3,productUpdate);

    await productManager.deleteProduct(5);

    productos = await productManager.getProducts();
    console.log(productos);
}

start();
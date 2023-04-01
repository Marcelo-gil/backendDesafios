import ProductManager from './managers/ProductManager.js';

const productManager = new ProductManager('./files/Productos.json');

const start = async () => {
    let productos = await productManager.getProducts();
    console.log(productos);

    const producto = {
        title: "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };

    await productManager.addProducts(producto);
    productos = await productManager.getProducts();
    console.log(productos);

    const productoId = await productManager.getProductById(2);
    console.log(productoId);

    const productUpdate = {
        title: "Este es un producto prueba",
        description: "Este es un producto prueba",
        price: 220,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };

    await productManager.updateProduct(3,productUpdate);
    if (productos.length >3) await productManager.deleteProduct(1);

    productos = await productManager.getProducts();
    console.log(productos);
}

start();
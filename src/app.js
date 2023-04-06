import express from "express";
import ProductManager from "./managers/ProductManager.js";

const app = express();

const productManager = new ProductManager("./files/Productos.json");

/* app.use(express.urlencoded({extended: true})); */

app.get("/products", async (req, res) => {
    const limit = Number(req.query.limit);
    const products = await productManager.getProducts();
    const productsLimit = limit ? products.slice(0, limit) : products;
    res.send(productsLimit);
});

app.get("/products/:pid", async (req, res) => {
    const pid = Number(req.params.pid);
    const products = await productManager.getProductById(pid);
    res.send(products);
});

app.listen(8080, () => console.log("Listening on 8080"));

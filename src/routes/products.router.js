import { Router } from 'express';
import ProductManager from "../ProductManager.js";
import __dirname from '../utils.js';

const router = Router();

const productManager = new ProductManager(__dirname + "/../files/Productos.json");

router.get("/", async (req, res) => {
    const limit = Number(req.query.limit);
    const products = await productManager.getProducts();    
    const productsLimit = limit ? products.slice(0, limit) : products;
    res.send(productsLimit);
});

router.get("/:pid", async (req, res) => {
    const pid = Number(req.params.pid);
    const products = await productManager.getProductById(pid);    
    res.send(products);
});


export default router;
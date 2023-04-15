import { Router } from 'express';
import CartManager from "../CartsManager.js";

const router = Router();

const cartManager = new CartManager("../files/Carts.json");

router.get("/carts", async (req, res) => {
    const limit = Number(req.query.limit);
    const carts = await cartManager.getCarts();
    const cartsLimit = limit ? carts.slice(0, limit) : carts;
    res.send(cartsLimit);
});

router.get("/carts/:pid", async (req, res) => {
    const pid = Number(req.params.pid);
    const carts = await cartManager.getCartById(pid);    
    res.send(carts);
});


export default router;
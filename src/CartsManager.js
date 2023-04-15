import fs from "fs";

export default class CartManager {
    constructor(path) {
        this.path = path;
    }

    /**
     * Valida los campos de un Carrito
     * @param {*} cart  Objeto del carrito
     * @returns True carrito Invalido
     */
    invalidCart(cart) {
        if (cart.title.trim().length === 0) {
            console.log("Debe Ingresar Titulo");
            return true;
        }

        if (cart.description.trim().length === 0) {
            console.log("Debe Ingresar Descripción");
            return true;
        }

        if (cart.thumbnail.trim().length === 0) {
            console.log("Falta Imagen");
            return true;
        }

        if (cart.price === 0) {
            console.log("Debe Ingresar el Precio");
            return true;
        }
        if (cart.stock === 0) {
            console.log("Debe Ingresar el Stock");
            return true;
        }

        if (cart.code.trim().length === 0) {
            console.log("Falta Codigo");
            return true;
        }
        return false;
    }

    /**
     * Agrega un carrito
     * @param {*} cart Objeto del carrito
     * @returns 
     */
    addCarts = async (cart) => {
        if (this.invalidCart(cart)) return;

        try {
            const carts = await this.getCarts();

            if (carts.length === 0) {
                cart.id = 1;
            } else {
                cart.id = carts[carts.length - 1].id + 1;
            }

            carts.push(cart);

            await fs.promises.writeFile(
                this.path,
                JSON.stringify(carts, null, "\t")
            );

            return cart;
        } catch (error) {
            console.log(error);
        }
    };

    getCarts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const cartsTxt = await fs.promises.readFile(
                    this.path,
                    "utf-8"
                );
                const carts = JSON.parse(cartsTxt);
                return carts;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Busca un Cart por Id
     * @param {*} idCart Id de un Carrito
     * @returns Cart
     */
    getCartById = async (idCart) => {
        const carts = await this.getCarts();
        const cart = carts.find((cart) => cart.id === idCart);

        if (!cart) {
            return {error: "Not found"};
        }

        return cart;
    };

    /**
     * Actualiza un Carrito
     * 
     * @param {*} idCart Id de un carrito
     * @param {*} cartUpdate carrito a Acutualizar
     * @returns 
     */
    updateCart = async (idCart, cartUpdate) => {
        if (this.invalidCart(cartUpdate)) return;

        try {
            const carts = await this.getCarts();
            const cart = carts.find((cart) => cart.id === idCart);

            if (cart) {
                const indexCart = carts.indexOf(cart);
                const updatedCart = { ...cartUpdate, id: cart.id };
                carts[indexCart] = updatedCart;
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(carts, null, "\t")
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Borra un carrito de la colección
     * @param {*} idCart Id del carrito
     */
    deleteCart = async (idCart) => {
        try {
            const carts = await this.getCarts();
            const cart = carts.find((cart) => cart.id === idCart);
            if (cart) {
                const cartsnew = carts.filter(
                    (cart) => cart.id !== idCart
                );
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(cartsnew, null, "\t")
                );
            } else {
                console.log("Not found");
            }
        } catch (error) {
            console.log(error);
        }
    };
}

import fs from "fs";

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    /**
     * Valida los campos de un producto
     * @param {*} product  Objeto del Producto
     * @returns True producto Invalido
     */
    invalidProduct(product) {
        if (product.title.trim().length === 0) {
            console.log("Debe Ingresar Titulo");
            return true;
        }

        if (product.description.trim().length === 0) {
            console.log("Debe Ingresar Descripción");
            return true;
        }

        if (product.thumbnail.trim().length === 0) {
            console.log("Falta Imagen");
            return true;
        }

        if (product.price === 0) {
            console.log("Debe Ingresar el Precio");
            return true;
        }
        if (product.stock === 0) {
            console.log("Debe Ingresar el Stock");
            return true;
        }

        if (product.code.trim().length === 0) {
            console.log("Falta Codigo");
            return true;
        }
        return false;
    }

    /**
     * Agrega un producto 
     * @param {*} product Objeto del producto
     * @returns 
     */
    addProducts = async (product) => {
        if (this.invalidProduct(product)) return;

        try {
            const products = await this.getProducts();

            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[products.length - 1].id + 1;
            }

            products.push(product);

            await fs.promises.writeFile(
                this.path,
                JSON.stringify(products, null, "\t")
            );

            return product;
        } catch (error) {
            console.log(error);
        }
    };

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const productsTxt = await fs.promises.readFile(
                    this.path,
                    "utf-8"
                );
                const products = JSON.parse(productsTxt);
                return products;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Busca un Producto por Id
     * @param {*} idProduct Id de Producto
     * @returns Producto
     */
    getProductById = async (idProduct) => {
        const products = await this.getProducts();
        const product = products.find((prod) => prod.id === idProduct);

        if (!product) {
            return {error: "Not found"};
        }

        return product;
    };

    /**
     * Actualiza un producto
     * 
     * @param {*} idProduct Id del producto
     * @param {*} productUpdate Producto a Acutualizar
     * @returns 
     */
    updateProduct = async (idProduct, productUpdate) => {
        if (this.invalidProduct(productUpdate)) return;

        try {
            const products = await this.getProducts();
            const product = products.find((prod) => prod.id === idProduct);

            if (product) {
                const indexProduct = products.indexOf(product);
                const updatedProduct = { ...productUpdate, id: product.id };
                products[indexProduct] = updatedProduct;
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(products, null, "\t")
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Borra un producto de la colección
     * @param {*} idProduct Id del producto
     */
    deleteProduct = async (idProduct) => {
        try {
            const products = await this.getProducts();
            const product = products.find((prod) => prod.id === idProduct);
            if (product) {
                const productsnew = products.filter(
                    (prod) => prod.id !== idProduct
                );
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(productsnew, null, "\t")
                );
            } else {
                console.log("Not found");
            }
        } catch (error) {
            console.log(error);
        }
    };
}

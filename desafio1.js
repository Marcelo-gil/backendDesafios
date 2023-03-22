class ProductManager {
    
    constructor() {
        this.products = [];
    }
    
    addProducts = (title,description,price,thumbnail,code,stock) => {
            const product= {title,description,price,thumbnail,code,stock};
            
            if (product.title.trim().length === 0){
                console.log("Debe Ingresar Titulo");
                return;
            }
            
            if (product.description.trim().length === 0){
                console.log("Debe Ingresar Descripción");
                return;
            }

            if (product.thumbnail.trim().length === 0){
                console.log("Falta Imagen");
                return;
            }

            if (product.price===0){
                console.log("Debe Ingresar el Precio");
                return;
            }
            if (product.stock===0){
                console.log("Debe Ingresar el Stock");
                return;
            }

            if (product.code.trim().length === 0){
                console.log("Falta Codigo");
                return;
            }

            if (this.products.length === 0) {
                product.id = 1;
            } else {
                product.id = this.products[this.products.length - 1].id + 1;
            }

            let existeCodigo = false;
            this.products.forEach((prod) => {
                if(prod.code === product.code) {
                    console.log("Ya existe el codigo");
                    existeCodigo = true;
                    return;
                } 
            });

            if (existeCodigo) return;


            this.products.push(product); 
        }
    
    getProducts = () => {
        return this.products;
    }

    getProductById = (idProduct) => {
        if (this.products.length === 0){
            console.log("Arreglo Vacio");
            return ;
        }

        let producto = undefined;
        this.products.forEach((prod) => {
            if(prod.id === idProduct) {
                producto = prod;
                return;
            } 
        });
        
        if (!producto){
            console.error("Not found")
            return;
        }
        return producto;
    }

}

const productManager = new ProductManager()
productManager.getProductById(2)
productManager.addProducts("producto prueba", "Este es un producto prueba",200,"Sin Foto","abc123",25)
productManager.addProducts("Alfajores", "Alfajor Dulce Leche",100,"Sin Foto","100",15)
productManager.addProducts("Alfajores", "Alfajor de Fruta",11,"Sin Foto","101",10)
productManager.addProducts("Caramelos", "Caramelo Acido",11,"Sin Foto","102",10)
productManager.addProducts("Caramelos", "Caramelo de Miel",11,"Sin Foto","103",10)
productManager.addProducts("Alfajores", "Alfajor de Fruta",11,"Sin Foto","101",10)

console.log(productManager.getProducts())

console.log(productManager.getProductById(2))

productManager.getProductById(1520)

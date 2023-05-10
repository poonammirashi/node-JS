const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart 
        fs.readFile(p, (err, fileContent) =>{
            let cart = { products: [], totalPrice: 0 }
            if(!err) {
                 cart = JSON.parse(fileContent);
            }
        
        // Analyse the cart => Find existing product
        const existingProductIndex = cart.products.findIndex(
            prod => prod.id === id
            );
        const existingProduct = cart.products[existingProductIndex];
        console.log(existingProductIndex);
        let updatedProduct;
         // Add new product/ increase quantity
        if(existingProduct) {
            updatedProduct ={...existingProduct }
            updatedProduct.qty = updatedProduct.qty +1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
        } else {
            updatedProduct = {id: id , qty: 1};
            cart.products = [...cart.products, updatedProduct]
        }
        cart.totalPrice = cart.totalPrice + +productPrice ;
        fs.writeFile(p, JSON.stringify(cart), err => {
            console.log(err);
        });
    });
    }

    static deleteProduct(id, price) {
        fs.readFile(p, (err,fileContent) => {
            if(err){
                return;
            }
            const updatedcart = {...JSON.parse(fileContent)};
            const product = updatedcart.products.find(p => p.id === id);
            const productqty = product.qty;
            updatedcart.products = updatedcart.products.filter(p => p.id !== id)
            updatedcart.totalPrice = updatedcart.totalPrice - price * productqty;
            fs.writeFile(p, JSON.stringify(updatedcart), err => {
                console.log(err);
            });
        })
       
    }
}

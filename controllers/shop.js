const Product = require('../models/product');
const order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // console.log(req.params);
  // console.log("prodId= ", prodId);
  Product.findByPk(prodId)
    .then(product => {
      console.log('productId=', product.id);
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      })
    }).catch(err => console.log(err));
  // Product.findAll({where: { id: prodId} })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products.title,
  //       path: '/products'
  //     });
  //   })
  // .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      // console.log(cart);
      return cart
        .getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedData;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedData = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        newQuantity = product.cartItem.quantity + 1;
        return product;
      }
      return Product.findByPk(prodId)
    })
    .then(product => {
      return fetchedData.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err))
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
  .getCart()
  .then(cart => {
    return cart.getProducts({where: {id : prodId}})
  })
  .then(products => {
    let product = products[0];
    return product.cartItem.destroy();
  })
  .then(result => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err));

};
exports.postOrdars = (req,res,next) => {
  let fetchedData;
  req.user
  .getCart()
  .then(cart => {
    fetchedData = cart;
     return cart.getProducts()
  })
  .then(products => {
    return req.user
    .createOrder()
    .then(order => {
      order.addProducts(
        products.map(product => {
          product.orderItem = {quantity : product.cartItem.quantity}
          return product;
        })
      )
    })
    .catch(err => console.log(err))
  })
  .then(result => {
    return  fetchedData.setProducts(null);
  })
  .then(result=> {
    res.redirect('/orders');
  })
  .catch(err => console.log(err))
  
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

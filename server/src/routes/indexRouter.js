const { Router } = require("express");

//* Controladores
const getProductsInfo = require("../controllers/getProductsInfo.js");
const getProducts = require("../controllers/getProducts.js");
const getProductById = require("../controllers/getProductById.js");
const postProduct = require("../controllers/postProduct.js");
const removeProduct = require("../controllers/removeProduct.js");
const updateProduct = require("../controllers/updateProduct.js");
const postReview = require("../controllers/postReview.js");
const addProductToCart = require("../controllers/addProductToCart.js");
const getCarrito = require("../controllers/getCarrito.js");
const deleteProductCarrito = require("../controllers/deleteProductCarrito.js");
const incrementoCarrito = require("../controllers/incrementoCarrito.js");
const decrementoCarrito = require("../controllers/decrementoCarrito.js");
const deleteCarrito = require("../controllers/deleteCarrito.js");

//* Router
const router = Router();

//* Rutas

router.get("/infoProductos", getProductsInfo);
router.get("/producto/:id", getProductById);
router.get("/carrito/:cartToken", getCarrito);
router.post("/productos", getProducts);
router.post("/createproduct", postProduct);
router.post("/agregarCarrito", addProductToCart);
router.post("/incrementQuantity", incrementoCarrito);
router.post("/decrementQuantity", decrementoCarrito);
router.post("/resena", postReview);
router.put("/updateproduct/:id", updateProduct);
router.delete("/removeproduct/:id", removeProduct);
router.delete("/removeFromCart", deleteProductCarrito);
router.delete("/deleteCarrito/:cartToken", deleteCarrito);

module.exports = router;

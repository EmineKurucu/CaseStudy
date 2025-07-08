const express = require("express");
const router = express.Router();
const {
    getAllProducts,
    getProductsByPriceRange,
    getProductsByPopularity
} = require("../controllers/productsControllers");

// /products all products
router.get("/", getAllProducts);

// /products/pricerange?min=a&max=b şeklinde
router.get("/price-range", getProductsByPriceRange);

// /products/popularity/:score
router.get("/popularity/:score", getProductsByPopularity);

module.exports = router;
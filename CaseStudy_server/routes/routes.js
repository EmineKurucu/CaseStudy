const express = require("express");
const router = express.Router();
const { getAllProducts } = require("../controllers/productsControllers");

// /products all products
router.get("/", getAllProducts);

module.exports = router;
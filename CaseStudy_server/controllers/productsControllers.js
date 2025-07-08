const fs = require("fs");
const axios = require("axios");
const path = require("path");

// Altın fiyatlarını güncel almak için goldapi.io'dan alınan API ve URL
const GOLD_API_KEY = "goldapi-kn2o8v19mcub24mw-io";
const GOLD_API_URL = "https://www.goldapi.io/api/XAU/USD";

// Altın fiyatı hesaplama
const getGoldPricePerGram = async () => {
    const response = await axios.get(GOLD_API_URL, {
        headers: {"x-access-token": GOLD_API_KEY}
    });
    const pricePerOunce = response.data.price;
    return pricePerOunce / 31.1035; 
}

// JSON Dosyası okuma
const readProducts = () =>{ 
    const filePath = path.join(__dirname, "..", "products.json");
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
};

// Genel Hesaplama Helper Fonksiyonu
const addPriceAndDisplayScore = (products, goldPrice) => {
  return products.map(p => {
    const priceUSD = (p.popularityScore + 1) * p.weight * goldPrice;
    const displayScore = (p.popularityScore * 5).toFixed(1); // DÜZELTİLDİ
    return {
      ...p,
      priceUSD: priceUSD.toFixed(2),
      displayScore: parseFloat(displayScore)
    };
  });
};

// Tüm ürünleri getir
const getAllProducts = async (req, res, next) => {
  try {
    const products = readProducts();
    const goldPrice = await getGoldPricePerGram();
    const enriched = addPriceAndDisplayScore(products, goldPrice);
    res.json(enriched);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts
};
const fs = require("fs");
const axios = require("axios");
const path = require("path");

// Altın fiyatlarını güncel almak için goldapi.io'dan alınan API ve URL
const GOLD_API_KEY = "goldapi-kn2o8vsmctge21t-io";
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
    const displayScore = ((p.popularityScore / 100) * 5).toFixed(1);
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

// Fiyat aralığı
const getProductsByPriceRange = async (req, res, next) => {
  const { min, max } = req.query;
  try {
    const products = readProducts();
    const goldPrice = await getGoldPricePerGram();
    const enriched = addPriceAndDisplayScore(products, goldPrice);
    const filtered = enriched.filter(p => {
      const price = parseFloat(p.priceUSD);
      return (!min || price >= parseFloat(min)) && (!max || price <= parseFloat(max));
    });
    res.json(filtered);
  } catch (err) {
    next(err);
  }
};

const getProductsByPopularity = async (req, res, next) => {
  const scoreParam = decodeURIComponent(req.params.score); // örn. "4+" URL'den çöz
  try {
    const products = readProducts();
    const goldPrice = await getGoldPricePerGram();
    const enriched = addPriceAndDisplayScore(products, goldPrice);

    let filtered = [];

    if (scoreParam === "0-2") {
      filtered = enriched.filter(p => parseFloat(p.displayScore) >= 0 && parseFloat(p.displayScore) < 2);
    } else if (scoreParam === "2-4") {
      filtered = enriched.filter(p => parseFloat(p.displayScore) >= 2 && parseFloat(p.displayScore) < 4);
    } else if (scoreParam === "4+") {
      filtered = enriched.filter(p => parseFloat(p.displayScore) >= 4);
    } else {
      // Bilinmeyen parametre -> hepsini getir
      filtered = enriched;
    }

    res.json(filtered);
  } catch (err) {
    next(err);
  }
};

;

module.exports = {
  getAllProducts,
  getProductsByPriceRange,
  getProductsByPopularity
};
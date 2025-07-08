const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS ayarını güncelle
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://your-frontend-domain.vercel.app"  // Vercel frontend URL'nizi buraya ekleyin
    ],
    credentials: true
}));

app.use(express.json()); // Bu satır eksik olabilir

//Routes
const productRoutes = require("./routes/routes");
const errorHandler = require("./middlewares/errorHandler");
app.use("/products", productRoutes);

app.use(errorHandler); // Bu satır routes'tan sonra olmalı

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
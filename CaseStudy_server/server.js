const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS ayarını düzelt - gerçek URL'nizi yazın
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://case-study-5mogyyr4x-eminekurucus-projects.vercel.app"  // Gerçek Vercel URL'niz
    ],
    credentials: true
}));

app.use(express.json());

//Routes
const productRoutes = require("./routes/routes");
const errorHandler = require("./middlewares/errorHandler");
app.use("/products", productRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
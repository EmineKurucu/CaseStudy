const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS middleware'i EN ÜSTE KOYUN
app.use(cors());

app.use(express.json());

// Routes
const productRoutes = require("./routes/routes");
const errorHandler = require("./middlewares/errorHandler");
app.use("/products", productRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

//Routes
const productRoutes = require("./routes/routes");
const errorHandler = require("./middlewares/errorHandler");
app.use("/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

});
app.use(errorHandler);

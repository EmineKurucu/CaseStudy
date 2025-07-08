const errorHandler = (err, req , res, next) => {
    console.error("Hata:", err.stack);
    res.status(err.status ||500).json({
        message: err.message || "Sunucu hatası",
    });
};

module.exports = errorHandler;
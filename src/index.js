const express = require("express");
const cors = require("cors");
const produkRoute = require("./routes/produkRouter.js");
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(err.status || 500).json({
    error: err.message || "Terjadi kesalahan di server",
  });
});

app.use("/api/produk", produkRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

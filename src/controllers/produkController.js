const prisma = require("../config/utils");

const getAllProduk = async (req, res) => {
  try {
    const data = await prisma.produk.findMany();
    res.json(data);
  } catch (err) {
    console.error("getAllProduk Error:", err);
    res.status(500).json({ error: "Gagal mengambil data produk." });
  }
};

const getProdukById = async (req, res) => {
  try {
    const { id } = req.params;
    const produk = await prisma.produk.findUnique({
      where: { id: Number(id) },
    });

    if (!produk) {
      return res.status(404).json({ error: "Produk tidak ditemukan." });
    }

    res.json(produk);
  } catch (err) {
    console.error("getProdukById Error:", err);
    res.status(500).json({ error: "Gagal mengambil produk berdasarkan ID." });
  }
};

module.exports = {
  getAllProduk,
  getProdukById,
};

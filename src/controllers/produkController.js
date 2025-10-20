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

const createProduk = async (req, res) => {
  try {
    const { kode_produk } = req.body;

    const existing = await prisma.produk.findUnique({
      where: { kode_produk },
    });
    if (existing) {
      return res.status(400).json({ error: "Kode produk sudah digunakan." });
    }

    const newProduk = await prisma.$transaction(async (tx) => {
      return await tx.produk.create({ data: req.body });
    });

    res.status(201).json(newProduk);
  } catch (err) {
    console.error("createProduk Error:", err);
    res.status(500).json({ error: "Gagal membuat produk baru." });
  }
};

const updateProduk = async (req, res) => {
  try {
    const { id } = req.params;

    const produk = await prisma.produk.findUnique({
      where: { id: Number(id) },
    });
    if (!produk) {
      return res.status(404).json({ error: "Produk tidak ditemukan." });
    }

    const updated = await prisma.produk.update({
      where: { id: Number(id) },
      data: req.body,
    });

    res.json(updated);
  } catch (err) {
    console.error("updateProduk Error:", err);
    res.status(500).json({ error: "Gagal memperbarui produk." });
  }
};

const deleteProduk = async (req, res) => {
  try {
    const { id } = req.params;

    const produk = await prisma.produk.findUnique({
      where: { id: Number(id) },
    });
    if (!produk) {
      return res.status(404).json({ error: "Produk tidak ditemukan." });
    }

    await prisma.produk.delete({ where: { id: Number(id) } });

    res.json({ message: "Produk berhasil dihapus." });
  } catch (err) {
    console.error("deleteProduk Error:", err);
    res.status(500).json({ error: "Gagal menghapus produk." });
  }
};

module.exports = {
  getAllProduk,
  getProdukById,
  createProduk,
  updateProduk,
  deleteProduk,
};

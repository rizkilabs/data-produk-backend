const validateProduk = (req, res, next) => {
  const data = req.body;
  const errors = [];

  if (req.method === "POST") {
    if (!data.kode_produk || typeof data.kode_produk !== "string") {
      errors.push("kode_produk wajib dan harus berupa string");
    }
  }

  if (!data.nama_produk || typeof data.nama_produk !== "string") {
    errors.push("nama_produk wajib dan harus berupa string");
  }

  if (!data.kategori || typeof data.kategori !== "string") {
    errors.push("kategori wajib diisi (contoh: Elektronik, Pakaian, Makanan)");
  }

  if (typeof data.harga !== "number" || data.harga <= 0) {
    errors.push("harga harus berupa angka positif");
  }

  if (typeof data.stok !== "number" || data.stok < 0) {
    errors.push("stok harus angka dan tidak boleh negatif");
  }

  if (data.deskripsi && typeof data.deskripsi !== "string") {
    errors.push("deskripsi harus berupa string jika diisi");
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors });
  }

  next();
};

module.exports = {
  validateProduk,
};

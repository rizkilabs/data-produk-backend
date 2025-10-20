const express = require("express");
const {
  getAllProduk,
  getProdukById,
  createProduk,
  updateProduk,
  deleteProduk,
} = require("../controllers/produkController.js");
const { validateProduk } = require("../middlewares/validation.js");

const router = express.Router();

router.get("/", getAllProduk);
router.get("/:id", getProdukById);
router.post("/", validateProduk, createProduk);
router.put("/:id", validateProduk, updateProduk);
router.delete("/:id", deleteProduk);

module.exports = router;

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

module.exports = router;

const express = require("express");
const {
  handelImageUpload,
  addproduct,
  fetchAllProducts,
  editProducts,
  deleteProduts,
} = require("../../controllers/admin/products-controller");
const { upload } = require("../../helper/cloudinary");
const { add } = require("lodash");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handelImageUpload);
router.post('/add',addproduct);
router.put('/edit/:id',editProducts);
router.get('/get',fetchAllProducts);
router.delete('/delete/:id',deleteProduts);


module.exports = router;

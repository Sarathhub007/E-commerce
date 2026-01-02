const { ImageUploadUtil } = require("../../helper/cloudinary");
const { Buffer } = require("buffer");
const products = require("../../models/products");
const handelImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await ImageUploadUtil(url);
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error occured",
    });
  }
};

//add new product
const addproduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = new products({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

//fetch a produxt
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await products.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

//edit a product

const editProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findproduct = await products.findById(id);
    if (!findproduct)
      return res.status(400).json({
        success: false,
        message: "product not found",
      });

    findproduct.title = title || findproduct.title;
    findproduct.description = description || findproduct.description;
    findproduct.category = category || findproduct.category;
    findproduct.brand = brand || findproduct.brand;
    findproduct.price = price === "" ? 0 : price || findproduct.price;
    findproduct.salePrice =
      salePrice === "" ? 0 : salePrice || findproduct.salePrice;
    findproduct.totalStock = totalStock || findproduct.totalStock;
    findproduct.image = image || findproduct.image;

    await findproduct.save();
    res.status(200).json({
      success: true,
      data: findproduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

//deleter product
const deleteProduts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await products.findByIdAndDelete(id);

    if (!product)
      req.status(404).json({
        success: false,
        message: "product Not Found",
      });
    res.status(200).json({
      success: true,
      data: " product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

module.exports = {
  handelImageUpload,
  addproduct,
  editProducts,
  deleteProduts,
  fetchAllProducts,
};

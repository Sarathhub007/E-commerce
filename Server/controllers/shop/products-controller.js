const products = require("../../models/products");

const getFilteredProducts = async (req, res) => {
  try {
    const product = await products.find({});
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};
module.exports={getFilteredProducts};

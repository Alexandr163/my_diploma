const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.patch("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    delete req.body._id;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
      }
    );
    res.send(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: "на сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/createProduct", async (req, res) => {
  const product = req.body;
  try {
    const existingProduct = await Product.findOne({ title: product.title });
    if (existingProduct) {
      return res.status(400).json({
        error: {
          message: `Product "${title}" exists`,
          code: 400,
        },
      });
    }
    const newProduct = await Product.create(product);
    res.status(200).send(newProduct);
  } catch (error) {

    res.status(500).json({
      message: `Не удалось создать товар с ${product.title}`,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const list = await Product.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "на сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/:productId", async (req, res) => {
  const {productId} = req.params

  try {
    
    const found = await Product.findById(productId);

    res.send(found);
  } catch (error) {
        res.status(500).json({
      message: "на сервере произошла ошибка. Попробуйте позже",
    });
  }

});


router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;  

    const removeProduct = await Product.findById(productId);


    removeProduct.remove();

    res.send(null);
  } catch (error) {
    res.status(500).json({
      message: "на сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;

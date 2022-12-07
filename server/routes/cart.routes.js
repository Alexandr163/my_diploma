const express = require("express");
const auth = require("../middleware/auth.middleware");
const Cart = require("../models/Cart");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Cart.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (error) {
      res.status(500).json({
        message: "на сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
        await Cart.create({
            ...req.body,
            
        })
    } catch (error) {
      res.status(500).json({
        message: "на сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

module.exports = router;

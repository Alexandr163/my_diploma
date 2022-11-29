const express = require("express");
const Admin = require("../models/Admin");
const router = express.Router({ mergeParams: true});

router.get("/", async (req, res) => {
    try {
      const list = await Admin.find();
      res.status(200).send(list);
    } catch (error) {
      res.status(500).json({
        message: "на сервере произошла ошибка. Попробуйте позже",
      });
    }
  });


module.exports = router;
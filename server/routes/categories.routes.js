const express = require("express");
const Category = require("../models/Category");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.patch("/updateCategory", async (req, res) => {
  const category = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      category._id,
      category,
      {
        new: true,
      }
    );

    res.send(updatedCategory);
  } catch (error) {
    res.status(500).json({
      message: `На сервере произошла ошибка. Категория ${category.title} не обновлена`,
    });
  }
});

router.post("/createCategory", async (req, res) => {
  const { title } = req.body;

  try {
    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
      return res.status(400).json({
        error: {
          message: `Category "${title}" exists`,
          code: 400,
        },
      });
    }

    const newCategory = await Category.create({ title });
    res.status(200).send(newCategory);
  } catch (error) {
    res.status(500).json({
      message: `Не удалось создать категорию с ${title}`,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const list = await Category.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "на сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    const removeCategory = await Category.findById(categoryId);

    removeCategory.remove();

    res.send(null);
  } catch (error) {
    res.status(500).json({
      message: "на сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;

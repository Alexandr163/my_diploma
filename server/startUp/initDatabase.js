const Category = require("../models/Category");
const Product = require("../models/Product");
const User = require("../models/User");
const categoriesMock = require("../mock/categories.json");
const productsMock = require("../mock/products.json");
const usersMock = require("../mock/users.json");

module.exports = async () => {
  const categories = await Category.find();
  if (categories.length !== categoriesMock.length) {
    await createInitialEntity(Category, categoriesMock);
  }
  const products = await Product.find();
  if (products.length !== productsMock.length) {
    await createInitialEntity(Product, productsMock);
  }
  const uasers = await User.find();
  if (uasers.length !== usersMock.length) {
    await createInitialEntity(User, usersMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}

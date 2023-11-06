module.exports = (app) => {
  const categorys = require("../controllers/category.controller.js");

  app.post("/categorys", categorys.create);

  app.get("/categorys", categorys.findAll);

  app.get("/categorys/:categoryId", categorys.findOne);

  app.put("/categorys/:categoryId", categorys.update);

  app.delete("/categorys/:categoryId", categorys.delete);
};

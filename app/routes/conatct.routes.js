module.exports = (app) => {
  const conatcts = require("../controllers/conatct.controller.js");

  app.post("/conatcts", conatcts.create);

  app.get("/conatcts", conatcts.findAll);

  app.get("/conatcts/:conatctId", conatcts.findOne);

  app.put("/conatcts/:conatctId", conatcts.update);

  app.delete("/conatcts/:conatctId", conatcts.delete);
};

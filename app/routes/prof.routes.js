module.exports = (app) => {
  const profs = require("../controllers/prof.controller.js");

  app.post("/profs", profs.create);

  app.get("/profs", profs.findAll);

  app.get("/profs/:profId", profs.findOne);

  app.put("/profs/:profId", profs.update);

  app.delete("/profs/:profId", profs.delete);
};

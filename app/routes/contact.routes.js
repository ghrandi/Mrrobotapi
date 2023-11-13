module.exports = (app) => {
  const contacts = require("../controllers/contact.controller.js");

  app.post("/contacts", contacts.create);

  app.get("/contacts", contacts.findAll);

  app.get("/contacts/:conatctId", contacts.findOne);

  app.put("/contacts/:conatctId", contacts.update);

  app.delete("/contacts/:conatctId", contacts.delete);
};

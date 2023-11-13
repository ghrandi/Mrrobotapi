const Contact = require("../models/contact.model.js");

// Create and Save a new conatct
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    return res.status(400).send({
      message: "username content can not be empty",
    });
  }

  // Create a product
  const contact = new Contact({
    username: req.body.username,
    email: req.body.email,
    object: req.body.object,
    message : req.body.message ,
  
  });

  // Save product in the database
  contact
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product.",
      });
    });
};

// Retrieve and return all product from the database.
exports.findAll = (req, res) => {
  Contact.find()
    .then((contact) => {
      res.send(contact);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving conatcts.",
      });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
  Contact.findById(req.params.contactId)
    .then((contact) => {
      if (!contact) {
        return res.status(404).send({
          message: "contact not found with id " + req.params.contactId,
        });
      }
      res.send(contact);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "contact not found with id " + req.params.contactId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving contact with id " + req.params.contactId,
      });
    });
};

// Update a product identified by the productId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.username) {
    return res.status(400).send({
      message: "contact content can not be empty",
    });
  }

  // Find product and update it with the request body
  Contact.findByIdAndUpdate(
    req.params.conatctId,
    {
      username: req.body.username || "Untitled conatct",
       email: req.body.email,
    object: req.body.object,
    message : req.body.message ,
    },
    { new: true }
  )
    .then((conatct) => {
      if (!conatct) {
        return res.status(404).send({
          message: "conatct not found with id " + req.params.conatctId,
        });
      }
      res.send(conatct);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "conatct not found with id " + req.params.conatctId,
        });
      }
      return res.status(500).send({
        message: "Error updating conatct with id " + req.params.conatctId,
      });
    });
};

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
  Conatct.findByIdAndRemove(req.params.conatctId)
    .then((conatct) => {
      if (!conatct) {
        return res.status(404).send({
          message: "conatct not found with id " + req.params.conatctId,
        });
      }
      res.send({ message: "conatct deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.username === "NotFound") {
        return res.status(404).send({
          message: "conatct not found with id " + req.params.conatctId,
        });
      }
      return res.status(500).send({
        message: "Could not delete conatct with id " + req.params.conatctId,
      });
    });
};

const Thou = require("../models/thou.model.js");

// Create and Save a new admin
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }

  // Create a admin
  const thou = new Mat({
    idsmat: req.body.idsmat || "Untitled Admin",
    nom: req.body.nom,
  
  });

  // Save admin in the database
  mat
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the admin.",
      });
    });
};

// Retrieve and return all admin from the database.
exports.findAll = (req, res) => {
  Thou.find()
    .then((thou) => {
      res.send(thou);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving admins.",
      });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
  Thou.findById(req.params.thouId)
    .then((thou) => {
      if (!thou) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.thouId,
        });
      }
      res.send(thou);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.thouId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving admin with id " + req.params.thouId,
      });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.thou) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }

  // Find admin and update it with the request body
  Thou.findByIdAndUpdate(
    req.params.thouId,
    {
      nom: req.body.nom || "Untitled admin",
   
     
    },
    { new: true }
  )
    .then((thou) => {
      if (!thou) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.thouId,
        });
      }
      res.send(thou);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.thouId,
        });
      }
      return res.status(500).send({
        message: "Error updating admin with id " + req.params.thouId,
      });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
  Thou.findByIdAndRemove(req.params.thouId)
    .then((thou) => {
      if (!thou) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.thouId,
        });
      }
      res.send({ message: "thou deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.nom === "NotFound") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.thouId,
        });
      }
      return res.status(500).send({
        message: "Could not delete admin with id " + req.params.thouId,
      });
    });
};

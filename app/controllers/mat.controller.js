const Mat = require("../models/mat.model.js");

// Create and Save a new admin
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }

  // Create a admin
  const mat = new Mat({
    nom: req.body.nom || "Untitled Admin",
    content: req.body.content,
  
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
  Mat.find()
    .then((mat) => {
      res.send(mat);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving admins.",
      });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
  Mat.findById(req.params.matId)
    .then((mat) => {
      if (!mat) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.matId,
        });
      }
      res.send(mat);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.matId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving admin with id " + req.params.matId,
      });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.nom) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }

  // Find admin and update it with the request body
  Mat.findByIdAndUpdate(
    req.params.matId,
    {
      nom: req.body.nom || "Untitled admin",
    content: req.body.content,
     
    },
    { new: true }
  )
    .then((mat) => {
      if (!mat) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.matId,
        });
      }
      res.send(mat);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.matId,
        });
      }
      return res.status(500).send({
        message: "Error updating admin with id " + req.params.matId,
      });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
  Mat.findByIdAndRemove(req.params.matId)
    .then((mat) => {
      if (!mat) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.matId,
        });
      }
      res.send({ message: "admin deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.nom === "NotFound") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.matId,
        });
      }
      return res.status(500).send({
        message: "Could not delete admin with id " + req.params.matId,
      });
    });
};

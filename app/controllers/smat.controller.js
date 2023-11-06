const Smat = require("../models/smat.model.js");

// Create and Save a new admin
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    return res.status(400).send({
      message: "sous matiere content can not be empty",
    });
  }

  // Create a admin
  const smat = new Smat({
    nom: req.body.nom || "Untitled Admin",
	idMat: req.body.idMat,
    content: req.body.content,
	
  
  });

  // Save admin in the database
  smat
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
  Smat.find()
    .then((smat) => {
      res.send(smat);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving admins.",
      });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
  Smat.findById(req.params.smatId)
    .then((smat) => {
      if (!smat) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.smatId,
        });
      }
      res.send(smat);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.smatId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving admin with id " + req.params.smatId,
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
  Smat.findByIdAndUpdate(
    req.params.smatId,
    {
      nom: req.body.nom || "Untitled admin",
    content: req.body.content,
     
    },
    { new: true }
  )
    .then((smat) => {
      if (!smat) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.smatId,
        });
      }
      res.send(smat);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.smatId,
        });
      }
      return res.status(500).send({
        message: "Error updating admin with id " + req.params.smatId,
      });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
  Smat.findByIdAndRemove(req.params.smatId)
    .then((smat) => {
      if (!smat) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.smatId,
        });
      }
      res.send({ message: "admin deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.nom === "NotFound") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.smatId,
        });
      }
      return res.status(500).send({
        message: "Could not delete admin with id " + req.params.smatId,
      });
    });
};

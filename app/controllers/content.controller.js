const Content = require("../models/content.model.js");

// Create and Save a new admin
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }

  // Create a admin
  const content = new Content({
    title: req.body.title || "Untitled Admin",
    mat: req.body.mat,
    smat: req.body.smat,
	 thou: req.body.thou,
    file: req.body.file,
  });

  // Save admin in the database
  content
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
  Content.find()
    .then((contents) => {
      res.send(contents);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving admins.",
      });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
  Content.findById(req.params.contentId)
    .then((content) => {
      if (!content) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.contentId,
        });
      }
      res.send(content);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.contentId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving admin with id " + req.params.contentId,
      });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.file) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }

  // Find admin and update it with the request body
  Content.findByIdAndUpdate(
    req.params.contentId,
    {
      title: req.body.title || "Untitled admin",
      mat: req.body.mat,
      smat: req.body.smat,
	   thou: req.body.thou,
      file: req.body.file,
    },
    { new: true }
  )
    .then((content) => {
      if (!content) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.contentId,
        });
      }
      res.send(content);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.contentId,
        });
      }
      return res.status(500).send({
        message: "Error updating admin with id " + req.params.conetntId,
      });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
  Content.findByIdAndRemove(req.params.contentId)
    .then((content) => {
      if (!admin) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.contentId,
        });
      }
      res.send({ message: "admin deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.contentId,
        });
      }
      return res.status(500).send({
        message: "Could not delete admin with id " + req.params.contentId,
      });
    });
};

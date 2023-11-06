const Prof = require("../models/prof.model.js");

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    return res.status(400).send({
      message: "user content can not be empty",
    });
  }

  // Create a user
  const prof = new Prof({
    fname: req.body.fname,
    lname: req.body.lname,

    email: req.body.email || "Untitled User",
    password: req.body.password,
  });

  // Save user in the database
  prof
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

// Retrieve and return all user from the database.
exports.findAll = (req, res) => {
  Prof.find()
    .then((profs) => {
      res.send(profs);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  Prof.findById(req.params.profId)
    .then((prof) => {
      if (!prof) {
        return res.status(404).send({
          message: "user not found with id " + req.params.profId,
        });
      }
      res.send(prof);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "user not found with id " + req.params.profId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.profId,
      });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.email) {
    return res.status(400).send({
      message: "user content can not be empty",
    });
  }

  // Find user and update it with the request body
  Prof.findByIdAndUpdate(
    req.params.profId,
    {
      fname: req.body.fname,
      lname: req.body.lname,
      
      email: req.body.email || "Untitled User",
      password: req.body.password,
    },
    { new: true }
  )
    .then((prof) => {
      if (!prof) {
        return res.status(404).send({
          message: "user not found with id " + req.params.profId,
        });
      }
      res.send(prof);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "user not found with id " + req.params.profId,
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.profId,
      });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  Prof.findByIdAndRemove(req.params.profId)
    .then((prof) => {
      if (!prof) {
        return res.status(404).send({
          message: "user not found with id " + req.params.profId,
        });
      }
      res.send({ message: "user deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "user not found with id " + req.params.profId,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.profId,
      });
    });
};

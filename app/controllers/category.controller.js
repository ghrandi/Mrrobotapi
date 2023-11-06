const Category = require("../models/category.model.js");

// Create and Save a new category
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "category content can not be empty",
    });
  }

  // Create a category
  const category = new Category({
    name: req.body.name || "Untitled Category",
  });

  // Save category in the database
  category
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category.",
      });
    });
};

// Retrieve and return all category from the database.
exports.findAll = (req, res) => {
  Category.find()
    .then((categorys) => {
      res.send(categorys);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categorys.",
      });
    });
};

// Find a single category with a categoryId
exports.findOne = (req, res) => {
  Category.findById(req.params.categoryId)
    .then((category) => {
      if (!category) {
        return res.status(404).send({
          message: "category not found with id " + req.params.categoryId,
        });
      }
      res.send(category);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "category not found with id " + req.params.categoryId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving category with id " + req.params.categoryId,
      });
    });
};

// Update a category identified by the categoryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    return res.status(400).send({
      message: "category content can not be empty",
    });
  }

  // Find category and update it with the request body
  Category.findByIdAndUpdate(
    req.params.categoryId,
    {
      name: req.body.name || "Untitled Category",
    },
    { new: true }
  )
    .then((category) => {
      if (!category) {
        return res.status(404).send({
          message: "category not found with id " + req.params.categoryId,
        });
      }
      res.send(category);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "category not found with id " + req.params.categoryId,
        });
      }
      return res.status(500).send({
        message: "Error updating category with id " + req.params.categoryId,
      });
    });
};

// Delete a category with the specified categoryId in the request
exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params.categoryId)
    .then((category) => {
      if (!category) {
        return res.status(404).send({
          message: "category not found with id " + req.params.categoryId,
        });
      }
      res.send({ message: "category deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "category not found with id " + req.params.categoryId,
        });
      }
      return res.status(500).send({
        message: "Could not delete category with id " + req.params.categoryId,
      });
    });
};

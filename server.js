const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// create express app
const app = express();

// Set up CORS with a dynamic origin check
const corsOptions = {
  origin: function (origin, callback) {
    if (origin === "https://fsegs.netlify.app") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Configuring the database
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect("mongodb+srv://malekghrandii:gryRkDvagNbuWXS6@cluster0.zstqfyj.mongodb.net/SS?retryWrites=true&w=majority", {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
})
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database: ", err);
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Rest API By Malek Ghrandi." });
});

require("./app/routes/mat.routes.js")(app);
require("./app/routes/smat.routes.js")(app);
require("./app/routes/thou.routes.js")(app);
require("./app/routes/content.routes.js")(app);

// Get the port number from the environment variable or use port 3000 as a default
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

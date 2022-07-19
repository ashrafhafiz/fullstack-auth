require("dotenv").config();
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

// require database connection
const dbConnect = require("./database");
dbConnect();

// add db models as a middleware and make it available to all routes
const models = require("./models");
app.use((req, res, next) => {
  req.context = {
    models,
  };
  // console.log(req.context);
  next();
});

const { userRoutes, authRoutes } = require("./routes");

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

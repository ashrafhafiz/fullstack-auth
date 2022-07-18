require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// require database connection
const dbConnect = require("./database");
dbConnect();

const userRoutes = require("./routes/userRoutes");

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express"),
  app = express(),
  port = process.env.PORT || 4100,
  ejs = require("ejs"),
  bodyParser = require("body-parser"),
  cors = require("cors");
connectDB = require("./config/db");
// connect DB
connectDB();

// All Sets
app.set("view engine", "ejs");
app.use(express.json({ extended: false }));

// Core Functionality
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Oridin", "*");

  res.header(("Access-Control-Allow-Headers", "*"));
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
app.use(cors());

app.get("/", (res, req) => {
  console.log("yolo");
  req.send("yolo");
});

app.post("/", (req, res) => {
  res.send("rolo");
});
app.use("/", require("./routes/index"));
app.use("/api/", require("./routes/url"));

app.listen(port, () => console.log(`running on ${port}`));

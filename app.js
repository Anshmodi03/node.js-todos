const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todo");

const app = express();
const PORT = 8000 || 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todoList", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.use("/", todoRoutes);

// Start the server
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

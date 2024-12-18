require("dotenv").config();
const cors = require("cors");
const path = require("path");
const express = require("express");
const app = express();
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");

const port = process.env.SERVER_PORT || 8080;
app.set("view cache", false);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
// app.use("others", express.static(path.join(__dirname, "uploads", "others")));

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(cors({ origin: 'http://ec2.foodash.org' }));
configViewEngine(app);

app.use("/", webRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("uploads"));

// Create the HTTP server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

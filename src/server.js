require('dotenv').config();
const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');

const port = process.env.SERVER_PORT;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://foodash.s3-website-ap-southeast-2.amazonaws.com", // Replace with your S3 bucket URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);
configViewEngine(app);

app.use("/", webRoutes);

// Create the HTTP server
app.listen(port, "0.0.0.0", () => {
  console.log(`App listening on port ${port}`);
});

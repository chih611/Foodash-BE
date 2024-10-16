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
app.use(cors());
configViewEngine(app);

app.use("/", webRoutes);

// Create the HTTP server
app.listen(port, "0.0.0.0", () => {
  console.log(`App listening on port ${port}`);
});

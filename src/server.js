require('dotenv').config();

const express = require('express');
const app = express();
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');

const port = process.env.SERVER_PORT;

configViewEngine(app);

app.use('/v1', webRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

require('dotenv').config();
const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');

const port = process.env.SERVER_PORT;
configViewEngine(app);

app.use(cors());
app.use('/v1', webRoutes);
// config static file
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

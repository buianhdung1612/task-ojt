const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const database = require('./config/database');
database.connect();

// Middleware
app.use(cors()); // Cho phép tất cả origin
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const routeClient = require('./routes/client/index.route');
routeClient(app);

// Lưu ý quan trọng ở đây!
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

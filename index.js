const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const port = 3000
require('dotenv').config()

const database = require("./config/database");
database.connect();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

const routeClient = require("./routes/client/index.route");
routeClient(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

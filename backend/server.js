/* eslint-disable no-undef */
// Create express app
var express = require("express")
var app = express()
const swagger = require('./config/swagger')
const authApi = require("./route/auth");
const customerApi = require("./route/customer");
const agentApi = require("./route/agent");
const allocationApi = require("./route/allocation");
const bodyParser = require('body-parser');

swagger.swaggerInitialize(app)

// Server port
var HTTP_PORT = process.env.PORT || 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, UPDATE, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, api_key, Accept, Authorization, role');
    res.header('Content-Type', 'application/json');

    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
});

// Root endpoint
app.get("/", (_, res) => {
    res.json({
        "message": "Ok"
    })
});

app.use("/v1/auth", authApi);
app.use("/v1/customer", customerApi);
app.use("/v1/agent", agentApi);
app.use("/v1/allocation", allocationApi);


// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});
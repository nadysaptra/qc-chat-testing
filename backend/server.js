// Create express app
var express = require("express")
var app = express()
const swagger = require('./config/swagger')
const authApi = require("./route/auth");
const customerApi = require("./route/customer");
const agentApi = require("./route/agent");
const allocationApi = require("./route/allocation");

swagger.swaggerInitialize(app)

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// Root endpoint
app.get("/", (_, res) => {
    res.json({"message":"Ok"})
});

app.use("/v1/auth", authApi);
app.use("/v1/customer", customerApi);
app.use("/v1/agent", agentApi);
app.use("/v1/allocation", allocationApi);


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
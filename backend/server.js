// Create express app
var express = require("express")
var app = express()
const customerApi = require("./route/customer");
const agentApi = require("./route/agent");
const allocationApi = require("./route/allocation");

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

app.use("/customer", customerApi);
app.use("/agent", agentApi);
app.use("/allocation", allocationApi);


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
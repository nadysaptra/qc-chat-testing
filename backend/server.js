// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
const usersApi = require("./route/users");

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res) => {
    res.json({"message":"Ok"})
});

app.use("/users", usersApi);

// users
app.get("/api/users", (req, res) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});



// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
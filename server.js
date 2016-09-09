/**
 * Created by munveergill on 07/09/2016.
 */
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var cors = require('cors');


var TODOS_COLLECTION = "todos";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:8000'}));


// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/", function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/*  "/todos"
 *    GET: finds all todos
 *    POST: creates a new todo
 */

app.get("/todos", function(req, res) {
    db.collection(TODOS_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get todos.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.post("/todos", function(req, res) {
    var newTodo = req.body;
    newTodo.createDate = new Date();

    if (!(req.body.title || req.body.description)) {
        handleError(res, "Invalid user input", "Must provide a title and description.", 400);
    }

    db.collection(TODOS_COLLECTION).insertOne(newTodo, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new todo.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

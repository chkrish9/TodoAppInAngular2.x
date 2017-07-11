var express = require("express");
var app = express();
var path = require("path");
var cors = require("cors");
var bodyParser = require('body-parser');
var router = require('./server/routes/routes');
var mongoose = require("mongoose");

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

//adding middleware - cors
app.use(cors());

router(app);

//connect to DB
//mongoose.connect('mongodb://localhost:27017/todolist');
mongoose.connect('mongodb://admin:admin@ds153392.mlab.com:53392/todolist');

//on connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to database')
});

mongoose.connection.on('error',(err)=>{
    if(err)
        console.log('Error in DB Connection ' + err);
});

//static files
app.use(express.static(path.join(__dirname,'public')));

app.listen( port ,function(){
    console.log("http://localhost:" + port);
});
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));//App use bodyparser
app.use(express.static('public'));//App use static files from the publick folder
//app.use(require('./routes/routes'));//App require routes file from routes folder
app.set('view engine', 'ejs');//View engine set to EJS

//Indexpage
app.get('/', (req, res) => {
    res.render('index');
});
//RatingPage
app.get('/rating', (req, res) => {
    res.render('ratingPage');
});

//Post for the email registrations
app.post('/email', (req, res) => {
    let email = req.body.email;

    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "test"
      });
      
      conn.connect(function(err) {
        if (err) throw err;
        console.log("Connected to database test!");
        conn.query('INSERT INTO emails (emails) VALUES(?)', [email], (err, res) => {
            if(err) throw err;
            console.log('Email inserted succesfully!');
        });
      });
    res.redirect('/');
});

//Post for the ratings
app.post('/send', (req, res) => {
    let positio = req.body.yritys;
    let value = req.body.rate;
    let value2 = req.body.rate2;
    let value3 = req.body.rate3;
    let message = req.body.message;

    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "test"
      });
      
      conn.connect(function(err) {
        if (err) throw err;
        console.log("Connected to database test!");
        conn.query('INSERT INTO rating (positio, value, value2, value3, textarea) VALUES(?, ?, ?, ?, ?)', [positio, value, value2, value3, message], (err, res) => {
            if(err) throw err;
            console.log('Data inserted successfull!');
        });
      });
    res.redirect('/rating');
});


app.listen(3000, () => {
    console.log('App is running on port 3000!');
});
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// expressjs middleware, each request will execute this block
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url}`;

    fs.appendFile('server.log', log+'\n');

    next();
});


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle : 'Home Page',
        welcomeText: 'Welcome to Home Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle : 'About Page',
        welcomeText: 'Welcome to About Page'
    });
});

app.listen(PORT, () => {
    console.log(`Application is listening on ${PORT}`);
});
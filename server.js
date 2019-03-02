
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

// Middleware
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('- Unable to append to server.log -');
        }
    });
    next();
});

// Maintenance
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// HBS Helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('shoutText', (text) => {
    return text.toUpperCase();
});

// Route handler (Home)
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: '- Welcome to the developer site! Here you can learn about our developed applications and connect to the community! -'
        // welcomeMessage: 'Welcome'
    });
});

// About
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: '- Welcome to the developer site! Here you can learn about our developed applications and connect to the community! -'
    });
});

// News
app.get('/news', (req, res) => {
    res.render('news.hbs', {
        pageTitle: '- Welcome to the developer site! Here you can learn about our developed applications and connect to the community! -'
    });
});

// Bad request
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: '- Request could not be handled -'
    });
});

// Begin listening on selected port
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

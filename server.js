const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const util = require('util');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');

//  Log Requests
app.use((req, res, next) => {
  const now = new Date().toString();
  const requestLog = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', requestLog + '\n', (err) => {
    if (err) {
      throw err;
    }
  });

  console.log(requestLog)
  next();
});

//  Render maintenance page
app.use((req, res, next) => {
  res.render('maintenance.hbs');
})

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

const pageProperties = {
  pageTitle: 'Home Page',
  welcomeMessage: 'Welcome to this page!'
}

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Some Text here',
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to this page!',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    ErrorMessage: 'Could not find request'
  })
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

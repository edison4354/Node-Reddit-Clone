// Require Libraries
const express = require('express');
const exphbs  = require('express-handlebars');

// Set db
require('./data/reddit-db');

// App Setup
const app = express();
const port = 3000

// Middleware

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


require('./controllers/posts')(app);


module.exports = app;

// Start Server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
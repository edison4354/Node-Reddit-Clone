// Require Libraries
require('dotenv').config();

const express = require('express');
const exphbs  = require('express-handlebars');

const cookieParser = require('cookie-parser');
const checkAuth = require('./middleware/checkAuth');

// App Setup
var app = express();
const port = 3000

// Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkAuth);



require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app);
require('./data/reddit-db');

module.exports = app;

// Start Server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}!`)
})
// Require Libraries
const express = require('express')
const exphbs  = require('express-handlebars');

// Set db
require('./data/reddit-db');

// App Setup
const app = express()
const port = 3000

//=================================MIDDLEWARE=================================\\

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.render('home')
})

//==================CONTROLLERS=======================\\

// require('./controllers/auth.js')(app);
require('./controllers/posts.js')(app);
// require('./controllers/comments.js')(app);
// require('./controllers/replies.js')(app);

//====================START SERVER============================\\
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
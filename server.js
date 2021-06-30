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
 
app.get('/posts/new', (req, res) => {
  res.render('posts-new')
})

//==================CONTROLLERS=======================\\

require('./controllers/posts.js')(app);

//====================START SERVER============================\\
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
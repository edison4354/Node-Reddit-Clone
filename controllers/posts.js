const Post = require('../models/post');

module.exports = (app) => {

  // CREATE
  app.post('/posts/new', (req, res) => {
    if (req.user) {
      const post = new Post(req.body);

      post.save(() => res.redirect('/'));
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

  // ALL POST
  app.get('/', (req, res) => {
    const currentUser = req.user;
    Post.find({}).lean()
        .then((posts) => res.render('posts-index', { posts, currentUser }))
        .catch((err) => {
            console.log(err.message);
        });
});

  app.get('/posts/new', (req, res) => {
    res.render('posts-new', {});
  })

  // LOOK UP THE POST
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean().populate('comments');
      return res.render('posts-show', { post });
    } catch (err) {
      console.log(err.message);
    }
  });

  // SUBREDDIT
  app.get('/n/:subreddit', (req, res) => {
    Post.find({ subreddit: req.params.subreddit }).lean()
      .then((posts) => res.render('posts-index', { posts }))
      .catch((err) => {
        console.log(err);
      });
  });
  
};
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Posts');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route  POST api/posts
// @desc   Create a post
// @access Private

router.post(
  '/',
  [auth, [check('text', 'Comment text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @route  GET api/posts
// @desc   Get all posts
// @access Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route  GET api/posts/:id
// @desc   Get post by id
// @access Private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ msg: 'Post not found!' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Post not found!' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route  DELETE api/posts/:id
// @desc   Delete post by id
// @access Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user.toString() !== req.user.id) {
      res.status(401).json({ msg: 'Unauthorized user' });
    }
    await post.remove();
    res.json({ msg: 'Post deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;

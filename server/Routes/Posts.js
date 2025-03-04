const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const auth = require('../middleware/authenticateToken');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'username');
    
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username'
        }
      });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create post


// Create post route
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, authorName } = req.body;
    
    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // Create post
    const newPost = new Post({
      title,
      content,
      // Use the custom username if available, otherwise use the one from auth
      authorName: authorName || req.user.username || 'Anonymous',
      author: req.user.id || null // Allow null for guest users
    });
    
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    console.error('Post creation error:', err);
    res.status(500).json({ 
      message: 'Server Error', 
      details: err.message 
    });
  }
});


// Update post
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    let post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check user
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    
    // Update
    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: { title, content } },
      { new: true }
    );
    
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check user
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    
    // Delete all comments for this post
    await Comment.deleteMany({ post: req.params.id });
    
    // Delete post
    await Post.findByIdAndRemove(req.params.id);
    
    res.json({ message: 'Post removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Like post
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Increment likes
    post.likes += 1;
    await post.save();
    
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add comment
router.post('/comment/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      
      const guestUsername = req.body.authorName;
      
      const newComment = new Comment({
        content: req.body.content,
        author: req.user.id,
        authorName: (req.user.id === null && guestUsername) ? guestUsername : req.user.username,
        post: req.params.id
      });
      
      // Rest of your code...
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

module.exports = router;
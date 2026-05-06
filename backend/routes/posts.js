const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Get all published posts
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 9, category = '', search = '' } = req.query;
    
    let query = { published: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Post.countDocuments(query);
    
    res.json({
      success: true,
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalPosts: total
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    
    // Increment views
    post.views += 1;
    await post.save();
    
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get featured posts
router.get('/featured/all', async (req, res) => {
  try {
    const posts = await Post.find({ featured: true, published: true })
      .limit(3)
      .sort({ createdAt: -1 });
    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Like post
router.post('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    
    post.likes += 1;
    await post.save();
    res.json({ success: true, likes: post.likes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add comment
router.post('/:id/comments', async (req, res) => {
  try {
    const { name, text } = req.body;
    
    if (!name || !text) {
      return res.status(400).json({ success: false, error: 'Name and text required' });
    }
    
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    
    post.comments.push({ name, text });
    await post.save();
    
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get related posts
router.get('/:id/related', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    
    const related = await Post.find({
      _id: { $ne: post._id },
      published: true,
      category: post.category
    })
    .limit(3)
    .sort({ createdAt: -1 });
    
    res.json({ success: true, posts: related });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
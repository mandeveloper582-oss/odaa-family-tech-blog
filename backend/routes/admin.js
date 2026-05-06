 const express = require('express');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const router = express.Router();

// Admin login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    res.json({
      success: true,
      token,
      user: { username, role: 'admin' }
    });
  } else {
    res.status(401).json({ 
      success: false, 
      error: 'Invalid credentials' 
    });
  }
});

// Verify token
router.post('/verify', (req, res) => {
  const { token } = req.body;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
});

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

// Create post
router.post('/posts', verifyAdmin, async (req, res) => {
  try {
    const { title, content, category, featured, coverImage } = req.body;
    
    const post = new Post({
      title,
      content,
      category: category || 'Technology',
      featured: featured || false,
      coverImage: coverImage || '',
      published: true
    });
    
    await post.save();
    res.status(201).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update post
router.put('/posts/:id', verifyAdmin, async (req, res) => {
  try {
    const { title, content, category, featured, coverImage, published } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    
    if (title) post.title = title;
    if (content) post.content = content;
    if (category) post.category = category;
    if (featured !== undefined) post.featured = featured;
    if (coverImage !== undefined) post.coverImage = coverImage;
    if (published !== undefined) post.published = published;
    
    await post.save();
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete post
router.delete('/posts/:id', verifyAdmin, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete comment
router.delete('/posts/:postId/comments/:commentId', verifyAdmin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    
    post.comments = post.comments.filter(
      comment => comment._id.toString() !== req.params.commentId
    );
    await post.save();
    
    res.json({ success: true, message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
 // Get all posts for admin
router.get('/posts', verifyAdmin, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get dashboard stats
router.get('/stats', verifyAdmin, async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    const totalViews = await Post.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);
    const totalLikes = await Post.aggregate([
      { $group: { _id: null, total: { $sum: '$likes' } } }
    ]);
    const totalComments = await Post.aggregate([
      { $group: { _id: null, total: { $sum: { $size: '$comments' } } } }
    ]);
    
    res.json({
      success: true,
      stats: {
        totalPosts,
        totalViews: totalViews[0]?.total || 0,
        totalLikes: totalLikes[0]?.total || 0,
        totalComments: totalComments[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  text: { 
    type: String, 
    required: true,
    maxlength: 1000
  },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    unique: true
  },
  content: { 
    type: String, 
    required: true 
  },
  excerpt: {
    type: String,
    maxlength: 300
  },
  coverImage: {
    type: String,
    default: ''
  },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  comments: [commentSchema],
  category: {
    type: String,
    enum: ['Technology', 'Family', 'Tutorial', 'News', 'Review'],
    default: 'Technology'
  },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create slug from title
postSchema.pre('save', function(next) {
  if (this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  }
  this.updatedAt = Date.now();
  
  // Generate excerpt
  if (this.content && !this.excerpt) {
    this.excerpt = this.content.substring(0, 200) + '...';
  }
  
  next();
});

// Index for search
postSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Post', postSchema);
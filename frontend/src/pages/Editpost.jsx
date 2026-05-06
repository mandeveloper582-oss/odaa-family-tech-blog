 import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, updatePost } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import toast from 'react-hot-toast';

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Technology');
  const [featured, setFeatured] = useState(false);
  const [coverImage, setCoverImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const categories = ['Technology', 'Family', 'Tutorial', 'News', 'Review'];

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPost(id);
        const post = response.post;
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category);
        setFeatured(post.featured);
        setCoverImage(post.coverImage || '');
      } catch (error) {
        toast.error('Failed to load post');
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };
    
    if (isAuthenticated) {
      fetchPost();
    }
  }, [id, isAuthenticated, navigate]);

  if (authLoading || loading) return <LoadingSpinner />;
  
  if (!isAuthenticated) {
    navigate('/admin');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setSaving(true);
    
    try {
      await updatePost(id, { title, content, category, featured, coverImage });
      toast.success('Post updated successfully!');
      navigate(/post/${id});
    } catch (error) {
      toast.error('Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Edit Post
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Update your post content
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cover Image URL
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
               className="input-field"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="12"
              className="input-field"
              required
            />
          </div>
          
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 text-primary-500"
            />
            <label htmlFor="featured" className="text-sm text-gray-700 dark:text-gray-300">
              Feature this post
            </label>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(/post/${id})}
              className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {saving ? 'Saving...' : '💾 Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
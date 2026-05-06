 import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPost, likePost, commentPost, getRelatedPosts } from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { format } from 'date-fns';
import { HiHeart, HiChat, HiEye } from 'react-icons/hi';

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await getPost(id);
      setPost(response.post);
      
      // Fetch related posts
      const related = await getRelatedPosts(id);
      setRelatedPosts(related.posts || []);
    } catch (error) {
      console.error('Failed to fetch post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const response = await likePost(id);
      setPost(prev => ({ ...prev, likes: response.likes }));
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;
    
    setSubmitting(true);
    try {
      const response = await commentPost(id, { name: commentName, text: commentText });
      setPost(response.post);
      setCommentName('');
      setCommentText('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!post) return <div className="text-center py-16">Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {post.coverImage && (
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        )}
        
        <div className="p-6 md:p-8">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b">
            <div className="flex items-center gap-1">
              <HiHeart className="text-red-500" />
              <span>{post.likes || 0} likes</span>
            </div>
            <div className="flex items-center gap-1">
              <HiChat />
              <span>{post.comments?.length || 0} comments</span>
            </div>
            <div className="flex items-center gap-1">
              <HiEye />
              <span>{post.views || 0} views</span>
            </div>
            <div>{format(new Date(post.createdAt), 'MMM dd, yyyy')}</div>
          </div>
          
          <div className="prose dark:prose-invert max-w-none mb-8">
            {post.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* Like Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition"
            >
              <HiHeart size={24} />
              <span className="font-semibold">Like this post</span>
            </button>
          </div>
          
          {/* Comments Section */}
          <div className="border-t pt-8">
            <h3 className="text-xl font-bold mb-6">Comments ({post.comments?.length || 0})</h3>
            
            <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="font-semibold text-primary-600 dark:text-primary-400">
                      {comment.name}
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 mt-1">
                      {comment.text}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      {format(new Date(comment.createdAt), 'MMM dd, yyyy')}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No comments yet. Be the first!</p>
              )}
            </div>
            
            <form onSubmit={handleComment} className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="input-field"
                required
              />
              <textarea
                placeholder="Write your comment..."
                rows="3"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="input-field"
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          </div>
        </div>
      </article>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(related => (
              <Link key={related._id} to={/post/${related._id}} className="card p-4 hover:shadow-lg transition">
                <h4 className="font-semibold mb-2 line-clamp-2">{related.title}</h4>
                <p className="text-sm text-gray-500">{related.likes || 0} likes</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
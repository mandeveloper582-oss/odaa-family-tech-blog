import { Link } from 'react-router-dom';
import { HiHeart, HiChat } from 'react-icons/hi';

export default function PostCard({ post }) {
  return (
    <div className="card group">
      {post.coverImage && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-5">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded text-xs">
            {post.category}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {post.excerpt || post.content.substring(0, 150)}...
        </p>
        
        <div className="flex items-center justify-between">
          <Link 
            to={`/post/${post._id}`}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Read More →
          </Link>
          
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <HiHeart className="text-red-500" />
              <span>{post.likes || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <HiChat />
              <span>{post.comments?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
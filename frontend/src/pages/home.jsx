import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, getFeaturedPosts } from '../services/api';
import PostCard from '../components/Post/PostCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featured, latest] = await Promise.all([
          getFeaturedPosts(),
          getPosts({ page: 1, limit: 6 })
        ]);
        setFeaturedPosts(featured.posts || []);
        setLatestPosts(latest.posts || []);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
          <div className="inline-block p-3 bg-white/20 backdrop-blur rounded-full mb-6">
            <span className="text-4xl">🌳</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to ODAA FAMILY TECH
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Empowering families through technology. Share, learn, and grow together.
          </p>
          <Link to="/blog" className="btn-secondary inline-block">
            Explore Blog →
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Featured Stories
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Hand-picked articles you don't want to miss
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Posts */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Latest Articles
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Fresh content from our community
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/blog" className="btn-primary inline-block">
            View All Posts →
          </Link>
        </div>
      </section>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🌳</span>
              <h3 className="text-xl font-bold">ODAA FAMILY TECH</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering families through technology. Sharing knowledge and insights.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary-400 transition">Home</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-primary-400 transition">Blog</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary-400 transition">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/blog?category=Technology" className="text-gray-400 hover:text-primary-400 transition">Technology</Link></li>
              <li><Link to="/blog?category=Family" className="text-gray-400 hover:text-primary-400 transition">Family</Link></li>
              <li><Link to="/blog?category=Tutorial" className="text-gray-400 hover:text-primary-400 transition">Tutorials</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition">
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} ODAA FAMILY TECH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
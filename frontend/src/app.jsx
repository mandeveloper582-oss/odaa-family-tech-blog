import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { useDarkMode } from './hooks/useDarkMode';
import Layout from './components/layout/layout';
import Home from './pages/Home';
import Blog from './pages/blog';
import SinglePost from './pages/SinglePost';
import About from './pages/About';
import Admin from './pages/Admin';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import './index.css';
function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className={darkMode ? 'dark' : ''}>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/post/:id" element={<SinglePost />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/create" element={<CreatePost />} />
                <Route path="/admin/edit/:id" element={<EditPost />} />
              </Routes>
            </Layout>
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: darkMode ? '#1f2937' : '#fff',
                color: darkMode ? '#fff' : '#1f2937',
              },
            }}
          />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_URL || '  https://odaa-family-website.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = Bearer ${token};
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error  error.message  'Something went wrong';
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
    }
    toast.error(message);
    return Promise.reject(error);
  }
);

// Public API
export const getPosts = (params) => api.get('/posts', { params });
export const getPost = (id) => api.get(/posts/${id});
export const likePost = (id) => api.post(/posts/${id}/like);
export const commentPost = (id, data) => api.post(/posts/${id}/comments, data);
export const getFeaturedPosts = () => api.get('/posts/featured/all');
export const getRelatedPosts = (id) => api.get(/posts/${id}/related);

// Admin API
export const adminLogin = (credentials) => api.post('/admin/login', credentials);
export const verifyToken = (token) => api.post('/admin/verify', { token });
export const createPost = (data) => api.post('/admin/posts', data);
export const updatePost = (id, data) => api.put(/admin/posts/${id}, data);
export const deletePost = (id) => api.delete(/admin/posts/${id});
export const getAllPosts = () => api.get('/admin/posts');
export const getAdminStats = () => api.get('/admin/stats');
export const deleteComment = (postId, commentId) => api.delete(/admin/posts/${postId}/comments/${commentId});

export default api;
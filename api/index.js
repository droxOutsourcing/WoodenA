const express = require('express');
const cors = require('cors');

const app = express();

// CORS 설정
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.vercel.app'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 기본 라우트들
app.get('/api', (req, res) => {
  res.json({ message: 'WoodenA API Server', status: 'running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 사용자 관련 API (임시)
app.get('/api/user', (req, res) => {
  res.json({ user: null, message: 'Not authenticated' });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  res.json({ success: false, message: 'Authentication not implemented yet' });
});

// 블로그 관련 API (임시)
app.get('/api/blog/posts', (req, res) => {
  res.json({ posts: [], message: 'Blog posts will be loaded from database' });
});

app.get('/api/blog/categories', (req, res) => {
  res.json({ categories: [], message: 'Categories will be loaded from database' });
});

// Vercel 서버리스 함수로 내보내기
module.exports = app;
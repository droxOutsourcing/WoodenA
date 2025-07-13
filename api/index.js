const express = require('express');
const cors = require('cors');
const { db } = require('./db');

const app = express();

// CORS 설정 - 모든 도메인 허용 (개발용)
app.use(cors({
  origin: true,
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

// 환경변수 테스트
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'OK',
    environment: {
      supabaseUrl: process.env.SUPABASE_URL ? 'set' : 'missing',
      supabaseKey: process.env.SUPABASE_ANON_KEY ? 'set' : 'missing',
      nodeEnv: process.env.NODE_ENV
    }
  });
});

// 사용자 관련 API
app.get('/api/user', (req, res) => {
  res.json({ user: null, message: 'Not authenticated' });
});

app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('Login attempt:', req.body);
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    // 환경변수 확인
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      console.error('Missing environment variables');
      return res.status(500).json({ 
        success: false, 
        message: 'Database configuration error' 
      });
    }

    const user = await db.getUserByUsername(username);
    console.log('Database query result:', user);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // 간단한 패스워드 검증 (데모용)
    if (password !== 'admin123') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    res.json({ 
      success: true, 
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email,
        role: user.role 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error: ' + error.message 
    });
  }
});

// 블로그 관련 API
app.get('/api/blog/posts', async (req, res) => {
  try {
    const { category, limit } = req.query;
    const filters = {};
    
    if (category) filters.categoryId = parseInt(category);
    if (limit) filters.limit = parseInt(limit);
    
    const posts = await db.getBlogPosts(filters);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ 
      posts: [], 
      error: 'Failed to load blog posts' 
    });
  }
});

app.get('/api/blog/posts/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = await db.getBlogPost(id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({ post });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: 'Failed to load blog post' });
  }
});

app.get('/api/blog/categories', async (req, res) => {
  try {
    const categories = await db.getBlogCategories();
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ 
      categories: [], 
      error: 'Failed to load categories' 
    });
  }
});

app.get('/api/blog/posts/:postId/comments', async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    const comments = await db.getBlogComments(postId);
    res.json({ comments });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ 
      comments: [], 
      error: 'Failed to load comments' 
    });
  }
});

app.post('/api/blog/posts/:postId/comments', async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    const { author_name, author_email, content } = req.body;
    
    if (!author_name || !author_email || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    const comment = await db.createBlogComment({
      post_id: postId,
      author_name,
      author_email,
      content,
      status: 'approved' // 자동 승인
    });
    
    if (!comment) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to create comment' 
      });
    }
    
    res.json({ success: true, comment });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Vercel 서버리스 함수로 내보내기
module.exports = app;
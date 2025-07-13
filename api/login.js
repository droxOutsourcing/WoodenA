// 로그인 API - CommonJS 형식
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    // 환경변수 확인
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return res.status(500).json({ 
        success: false, 
        message: 'Database configuration error',
        debug: {
          url: process.env.SUPABASE_URL ? 'set' : 'missing',
          key: process.env.SUPABASE_ANON_KEY ? 'set' : 'missing'
        }
      });
    }

    // Supabase 클라이언트 초기화
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    
    // 사용자 검색
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      return res.status(500).json({ 
        success: false, 
        message: 'Database error',
        error: error.message
      });
    }
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // 간단한 패스워드 검증
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
};
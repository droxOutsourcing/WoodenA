module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;
    
    // 간단한 하드코딩된 검증
    if (username === 'admin' && password === 'admin123') {
      res.json({ 
        success: true, 
        user: { 
          id: 1, 
          username: 'admin', 
          email: 'admin@woodena.com',
          role: 'admin' 
        } 
      });
    } else {
      res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error: ' + error.message 
    });
  }
};
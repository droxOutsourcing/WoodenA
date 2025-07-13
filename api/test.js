// 테스트 API - CommonJS 형식
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: {
      supabaseUrl: process.env.SUPABASE_URL ? 'set' : 'missing',
      supabaseKey: process.env.SUPABASE_ANON_KEY ? 'set' : 'missing',
      nodeEnv: process.env.NODE_ENV
    }
  });
};
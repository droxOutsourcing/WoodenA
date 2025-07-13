// Supabase 데이터베이스 연결 설정
const { createClient } = require('@supabase/supabase-js');

// 환경변수에서 Supabase 설정 가져오기
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;

// Supabase 클라이언트 초기화
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

// 데이터베이스 작업 함수들
const db = {
  // 사용자 관련
  async getUser(id) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Database error:', error);
      return null;
    }
    return data;
  },

  async getUserByUsername(username) {
    if (!supabase) {
      console.log('Supabase not initialized. Environment vars:', {
        url: process.env.SUPABASE_URL ? 'set' : 'missing',
        key: process.env.SUPABASE_ANON_KEY ? 'set' : 'missing'
      });
      return null;
    }
    
    console.log('Searching for user:', username);
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Database error:', error);
      return null;
    }
    console.log('User found:', data ? 'yes' : 'no');
    return data;
  },

  async createUser(user) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select()
      .single();
    
    if (error) {
      console.error('Database error:', error);
      return null;
    }
    return data;
  },

  // 블로그 카테고리 관련
  async getBlogCategories() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Database error:', error);
      return [];
    }
    return data || [];
  },

  async createBlogCategory(category) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('blog_categories')
      .insert([category])
      .select()
      .single();
    
    if (error) {
      console.error('Database error:', error);
      return null;
    }
    return data;
  },

  // 블로그 포스트 관련
  async getBlogPosts(filters = {}) {
    if (!supabase) return [];
    
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories(name, slug),
        users(username, email)
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (filters.categoryId) {
      query = query.eq('category_id', filters.categoryId);
    }
    
    if (filters.limit) {
      query = query.limit(filters.limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Database error:', error);
      return [];
    }
    return data || [];
  },

  async getBlogPost(id) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories(name, slug),
        users(username, email)
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Database error:', error);
      return null;
    }
    return data;
  },

  async getBlogPostBySlug(slug) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories(name, slug),
        users(username, email)
      `)
      .eq('slug', slug)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Database error:', error);
      return null;
    }
    return data;
  },

  async createBlogPost(post) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
      .single();
    
    if (error) {
      console.error('Database error:', error);
      return null;
    }
    return data;
  },

  // 블로그 댓글 관련
  async getBlogComments(postId) {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('blog_comments')
      .select(`
        *,
        users(username, email)
      `)
      .eq('post_id', postId)
      .eq('status', 'approved')
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Database error:', error);
      return [];
    }
    return data || [];
  },

  async createBlogComment(comment) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('blog_comments')
      .insert([comment])
      .select()
      .single();
    
    if (error) {
      console.error('Database error:', error);
      return null;
    }
    return data;
  }
};

module.exports = { db, supabase };
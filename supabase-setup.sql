-- WoodenA 프로젝트용 Supabase 데이터베이스 스키마

-- 사용자 테이블
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'author')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 블로그 카테고리 테이블
CREATE TABLE blog_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 블로그 포스트 테이블
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image VARCHAR(500),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES blog_categories(id) ON DELETE SET NULL,
  tags TEXT[],
  meta_title VARCHAR(255),
  meta_description TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 블로그 댓글 테이블
CREATE TABLE blog_comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  parent_id INTEGER REFERENCES blog_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at);
CREATE INDEX idx_blog_comments_post ON blog_comments(post_id);
CREATE INDEX idx_blog_comments_status ON blog_comments(status);

-- 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_categories_updated_at BEFORE UPDATE ON blog_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_comments_updated_at BEFORE UPDATE ON blog_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 샘플 데이터 삽입

-- 관리자 사용자 (패스워드: admin123)
INSERT INTO users (username, email, password_hash, role) VALUES 
('admin', 'admin@woodena.com', '$2b$10$rOvNZGIqZYqJQqS9rZqJVOXNrKK1nK9K9OT9K9K9K9K9K9K9K9K9K', 'admin'),
('author1', 'author1@woodena.com', '$2b$10$rOvNZGIqZYqJQqS9rZqJVOXNrKK1nK9K9OT9K9K9K9K9K9K9K9K9K', 'author'),
('user1', 'user1@woodena.com', '$2b$10$rOvNZGIqZYqJQqS9rZqJVOXNrKK1nK9K9OT9K9K9K9K9K9K9K9K9K', 'user');

-- 블로그 카테고리
INSERT INTO blog_categories (name, slug, description) VALUES 
('Furniture Care', 'furniture-care', '가구 관리 및 유지보수에 관한 팁'),
('Interior Design', 'interior-design', '인테리어 디자인 및 데코레이션'),
('Wood Types', 'wood-types', '다양한 목재 종류와 특성'),
('DIY Projects', 'diy-projects', '직접 만드는 가구 프로젝트'),
('Company News', 'company-news', '회사 소식 및 업데이트');

-- 블로그 포스트
INSERT INTO blog_posts (title, slug, content, excerpt, status, author_id, category_id, tags, published_at) VALUES 
(
  'The Art of Wooden Furniture Care', 
  'art-of-wooden-furniture-care',
  '목재 가구는 올바른 관리로 수십 년간 아름다움을 유지할 수 있습니다. 이 글에서는 목재 가구를 오랫동안 보존하는 방법을 알아보겠습니다.

## 일상 관리법

### 1. 먼지 제거
부드러운 마이크로파이버 천을 사용하여 정기적으로 먼지를 제거하세요. 거친 천이나 화학 세제는 목재 표면을 손상시킬 수 있습니다.

### 2. 습도 조절
목재는 습도 변화에 민감합니다. 실내 습도를 40-60% 사이로 유지하는 것이 좋습니다.

### 3. 직사광선 피하기
장시간 직사광선에 노출되면 목재가 변색되거나 갈라질 수 있습니다. 커튼이나 블라인드를 활용하세요.

## 전문 관리법

### 오일링
3-6개월마다 전용 목재 오일로 영양을 공급하면 목재의 자연스러운 윤기를 유지할 수 있습니다.

### 왁싱
고급 목재 가구는 1년에 1-2회 왁싱을 통해 보호막을 형성하는 것이 좋습니다.',
  '목재 가구를 오랫동안 아름답게 유지하는 전문적인 관리 방법을 소개합니다.',
  'published',
  2,
  1,
  ARRAY['가구관리', '목재', '유지보수'],
  CURRENT_TIMESTAMP - INTERVAL '7 days'
),
(
  'Modern Minimalist Interior Design Trends', 
  'modern-minimalist-interior-design-trends',
  '2024년 인테리어 트렌드는 미니멀리즘과 기능성의 완벽한 조화를 추구합니다.

## 핵심 요소

### 1. 깔끔한 라인
직선적이고 단순한 디자인이 공간을 더욱 넓어 보이게 합니다.

### 2. 자연 소재
원목, 리넨, 코튼 등 자연 소재를 활용한 가구와 소품이 인기입니다.

### 3. 뉴트럴 컬러
베이지, 그레이, 화이트 등 중성 색상을 기본으로 포인트 컬러를 활용합니다.

## 실용적인 팁

- 수납 공간을 최대화하는 다기능 가구 활용
- 자연광을 최대한 활용하는 창문 배치
- 식물을 활용한 자연스러운 포인트 연출',
  '2024년 가장 인기 있는 미니멀리스트 인테리어 디자인 트렌드를 알아보세요.',
  'published',
  2,
  2,
  ARRAY['인테리어', '미니멀', '트렌드'],
  CURRENT_TIMESTAMP - INTERVAL '3 days'
),
(
  'Understanding Different Wood Types for Furniture', 
  'understanding-wood-types-furniture',
  '가구 제작에 사용되는 다양한 목재의 특성을 이해하면 더 좋은 선택을 할 수 있습니다.

## 경목재 (Hardwood)

### 오크 (Oak)
- 견고하고 내구성이 뛰어남
- 아름다운 나이테 패턴
- 전통 가구에 널리 사용

### 월넛 (Walnut)
- 고급스러운 다크 브라운 색상
- 가공성이 우수함
- 프리미엄 가구에 사용

## 연목재 (Softwood)

### 파인 (Pine)
- 가벼우면서도 적당한 강도
- 경제적인 가격
- 캐주얼한 가구에 적합

### 삼나무 (Cedar)
- 방충 효과
- 향이 좋음
- 옷장이나 수납장에 이상적

## 선택 가이드

가구의 용도와 예산, 디자인 선호도를 고려하여 적합한 목재를 선택하세요.',
  '가구 제작에 사용되는 다양한 목재의 특성과 선택 가이드를 제공합니다.',
  'published',
  2,
  3,
  ARRAY['목재', '가구재료', '선택가이드'],
  CURRENT_TIMESTAMP - INTERVAL '1 day'
);

-- 댓글 샘플
INSERT INTO blog_comments (post_id, author_name, author_email, content, status) VALUES 
(1, 'John Smith', 'john@example.com', '정말 유용한 정보네요! 제 오크 테이블 관리에 바로 적용해보겠습니다.', 'approved'),
(1, 'Sarah Kim', 'sarah@example.com', '습도 조절이 이렇게 중요한지 몰랐어요. 감사합니다.', 'approved'),
(2, 'Mike Johnson', 'mike@example.com', '미니멀 인테리어에 관심이 많았는데 도움이 됐습니다.', 'approved'),
(3, 'Emily Chen', 'emily@example.com', '월넛과 오크의 차이를 명확히 알 수 있어서 좋았습니다.', 'approved');
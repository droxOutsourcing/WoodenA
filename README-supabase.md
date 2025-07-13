# Supabase 데이터베이스 연동 가이드

## 🎯 Supabase 설정 단계

### 1. Supabase 계정 생성
1. [supabase.com](https://supabase.com) 접속
2. "Start your project" 클릭
3. GitHub으로 로그인

### 2. 새 프로젝트 생성
1. "New project" 클릭
2. **Project name**: `WoodenA`
3. **Database Password**: 강력한 비밀번호 설정
4. **Region**: 가장 가까운 지역 선택
5. "Create new project" 클릭 (2-3분 소요)

### 3. 데이터베이스 스키마 설정
1. 왼쪽 메뉴에서 **"SQL Editor"** 클릭
2. `supabase-setup.sql` 파일 내용 복사
3. SQL Editor에 붙여넣기
4. **"Run"** 버튼 클릭

### 4. 연결 정보 확인
1. **Settings** → **API** 메뉴
2. 다음 정보 복사:
   - **Project URL**: `https://xxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1...`

### 5. Vercel 환경변수 설정
1. Vercel 프로젝트 대시보드 접속
2. **Settings** → **Environment Variables**
3. 다음 변수 추가:
   ```
   SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
   ```
4. **"Save"** 클릭

### 6. 배포 확인
1. Vercel에서 **"Redeploy"** 클릭
2. 배포 완료 후 API 테스트:
   - `https://your-site.vercel.app/api/blog/posts`
   - `https://your-site.vercel.app/api/blog/categories`

## 📊 포함된 샘플 데이터

### 사용자
- `admin` / `admin@woodena.com` (관리자)
- `author1` / `author1@woodena.com` (작성자)
- `user1` / `user1@woodena.com` (일반 사용자)

### 블로그 카테고리
- Furniture Care (가구 관리)
- Interior Design (인테리어 디자인)
- Wood Types (목재 종류)
- DIY Projects (DIY 프로젝트)
- Company News (회사 소식)

### 블로그 포스트
- "The Art of Wooden Furniture Care"
- "Modern Minimalist Interior Design Trends"
- "Understanding Different Wood Types for Furniture"

### 댓글
- 각 포스트별 실제 댓글 샘플 포함

## 🚀 API 엔드포인트

### 인증
- `POST /api/auth/login` - 로그인

### 블로그
- `GET /api/blog/posts` - 포스트 목록
- `GET /api/blog/posts/:id` - 특정 포스트
- `GET /api/blog/categories` - 카테고리 목록
- `GET /api/blog/posts/:postId/comments` - 댓글 목록
- `POST /api/blog/posts/:postId/comments` - 댓글 작성

## 💰 Supabase 무료 플랜
- **프로젝트**: 2개
- **데이터베이스**: 500MB
- **파일 저장소**: 1GB
- **월 활성 사용자**: 10,000명
- **API 요청**: 무제한

완전히 무료로 운영 가능합니다!
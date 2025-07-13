# 🚀 WoodenA 배포 가이드

## 1단계: GitHub 리포지토리 생성
1. GitHub에서 새 리포지토리 생성 (Public)
2. 이 폴더의 모든 파일 업로드

## 2단계: Supabase 데이터베이스 설정
1. [supabase.com](https://supabase.com) 접속 및 회원가입
2. "New Project" 클릭
   - Organization: 본인 계정
   - Name: `WoodenA`
   - Database Password: 안전한 비밀번호 설정
   - Region: `Northeast Asia (Seoul)` 선택
3. 프로젝트 생성 대기 (1-2분)
4. **SQL Editor**에서 `supabase-setup.sql` 파일 내용 전체 복사하여 실행
5. **Settings** → **API**에서 정보 복사:
   ```
   Project URL: https://xxx.supabase.co
   anon public: eyJhbGciOiJIUzI1...
   ```

## 3단계: Vercel 배포
1. [vercel.com](https://vercel.com) 접속 및 GitHub 연동
2. "New Project" → GitHub 리포지토리 선택
3. **Environment Variables** 설정:
   ```
   SUPABASE_URL = https://xxx.supabase.co
   SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1...
   ```
4. **Deploy** 클릭

## 4단계: 배포 확인
- 메인 사이트: `https://your-app.vercel.app`
- API 테스트: `https://your-app.vercel.app/api/simple`
- 환경 변수 확인: `https://your-app.vercel.app/api/env-check`

## 5단계: 로그인 테스트
- 사용자: `admin` / 비밀번호: `admin123`
- API 테스트: `https://your-app.vercel.app/api/login-simple`

## ✅ 완료!
- 전체 배포 과정: 5-10분
- 무료 호스팅 (Vercel + Supabase)
- 모든 기능 완전 작동
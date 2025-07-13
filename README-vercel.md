# WoodenA Vercel 배포 가이드

## 🚀 Vercel 풀스택 무료 배포

### ✅ 무료 플랜 혜택
- **대역폭**: 100GB/월
- **서버리스 함수**: 100,000회 호출/월
- **함수 실행 시간**: 10초
- **배포 횟수**: 무제한
- **비용**: 완전 무료 (개인 사용)

### 📁 프로젝트 구조
```
WoodenA/
├── api/              # 백엔드 API (서버리스 함수)
│   └── index.js      # Express 서버
├── client/           # React 프론트엔드
├── server/           # 원본 Express 서버 (참고용)
├── shared/           # 공유 스키마
├── vercel.json       # Vercel 설정
└── package.json      # 의존성
```

### 🔧 배포 단계

#### 1. GitHub 저장소 준비
1. GitHub에 새 저장소 생성
2. 프로젝트 파일 업로드
3. `main` 브랜치에 푸시

#### 2. Vercel 연결
1. [vercel.com](https://vercel.com) 접속
2. GitHub으로 로그인
3. "New Project" → GitHub 저장소 선택
4. "Import" 클릭

#### 3. 환경 변수 설정 (선택사항)
```
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:port/db
```

#### 4. 자동 배포
- Git push 시 자동 배포
- 빌드 완료 후 URL 생성
- HTTPS 자동 적용

### 🔗 API 엔드포인트
- `/api` - 서버 상태 확인
- `/api/health` - 헬스 체크
- `/api/user` - 사용자 정보
- `/api/auth/login` - 로그인
- `/api/blog/posts` - 블로그 포스트
- `/api/blog/categories` - 블로그 카테고리

### 📊 현재 상태
- ✅ 프론트엔드: React + Vite
- ✅ 백엔드: Express (서버리스)
- ⏳ 데이터베이스: Neon PostgreSQL 연결 예정
- ⏳ 인증: 구현 예정
- ⏳ 블로그: 실제 데이터 연결 예정

### 🎯 다음 단계
1. Neon PostgreSQL 무료 계정 생성
2. DATABASE_URL 환경변수 설정
3. 실제 API 로직 구현
4. 프론트엔드-백엔드 연결 테스트

### 💡 팁
- 무료 플랜은 개인 사용만 가능
- 상업적 사용 시 Pro 플랜 필요 ($20/월)
- 함수 실행 시간 10초 제한
- 콜드 스타트 있음 (첫 요청 시 지연)
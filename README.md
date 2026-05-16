# Ne-O-rdinary Hackathon 10th - U Frontend

U조 프론트엔드 레포지토리입니다.  
레시피 피드 탐색, 레시피 상세 조회, 레시피 생성 흐름을 중심으로 한 칵테일/주류 레시피 서비스 UI를 구현합니다.

## 프로젝트 구성

```text
multi_nerd/
├─ dsms/      # Next.js 웹 프론트엔드
└─ dsms-app/  # Expo 기반 앱 프로젝트
```

## FE 기술 스택

| 구분 | 기술 |
| --- | --- |
| 언어 | TypeScript 5 |
| 프레임워크 | Next.js 16.2.6 |
| CSS 프레임워크 | Tailwind CSS 4 |
| 차트 라이브러리 | Recharts 3.8.1 |

## 시작하기

### Web

```bash
cd dsms
npm install
npm run dev
```

개발 서버 실행 후 브라우저에서 `http://localhost:3000`으로 접속합니다.

### App

```bash
cd dsms-app
npm install
npm run start
```

Expo 안내에 따라 iOS, Android, Web 중 원하는 환경에서 실행합니다.

## 주요 화면

- `/` - 추천 레시피 피드
- `/search` - 검색 및 재료 기반 탐색
- `/posts/[postid]` - 레시피 상세
- `/posts/new` - 레시피 생성

## 개발 스크립트

### dsms

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | Next.js 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint 검사 |

### dsms-app

| 명령어 | 설명 |
| --- | --- |
| `npm run start` | Expo 개발 서버 실행 |
| `npm run android` | Android 앱 실행 |
| `npm run ios` | iOS 앱 실행 |
| `npm run web` | Web 환경 실행 |
| `npm run lint` | Expo lint 검사 |

## 브랜치 네이밍 규칙

작업 목적이 드러나도록 아래 형식을 사용합니다.

```text
feat/feed
fix/tag-input-ime
hotfix/search-crash
refactor/recipe-form
```

| Prefix | 용도 |
| --- | --- |
| `feat` | 기능 추가 |
| `fix` | 버그 수정 |
| `hotfix` | 긴급 수정 |
| `refactor` | 동작 변경 없는 구조 개선 |

## 커밋 메시지

커밋은 변경 의도가 한눈에 보이도록 작성합니다.

```text
feat: 추천 레시피 피드 추가
fix: 한글 입력 중 태그 중복 생성 방지
refactor: 레시피 생성 단계 컴포넌트 분리
```

## 작업 전 체크리스트

- 최신 브랜치 기준인지 확인합니다.
- UI 작업 전 기존 컴포넌트와 디자인 토큰을 먼저 확인합니다.
- 앱에 노출되는 문구는 한국어를 우선 사용합니다.
- 공통 설정 파일은 꼭 필요한 경우에만 수정합니다.
- 변경 후 가능한 범위에서 `npm run lint` 또는 관련 화면 동작을 확인합니다.

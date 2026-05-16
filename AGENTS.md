# EUM Frontend 개인 Codex 규칙

## 프로젝트 맥락
- nextjs로 구현
- 패키지 매니저는 `npm`을 사용한다.
- 새 구조를 만들기 전 구현된 디자인 패턴 시스템을 반드시 확인한다.

## Git 안전 규칙
- 코드 변경 전 현재 브랜치와 `git status`를 확인한다.
- 명시적으로 요청받지 않는 한 commit, push, reset, rebase, 파일 삭제를 하지 않는다.
- 작업에 꼭 필요하지 않다면 `README.md`, `package.json`, `.gitignore`, 네이티브 프로젝트 설정 같은 공유 설정 파일을 수정하지 않는다.
- 개인용 변경은 `AGENTS.override.md`나 `.agents/`처럼 Git에서 무시되는 로컬 파일에만 둔다.

## 프론트엔드 작업 방식

- UI를 변경하기 전에 주변 화면과 컴포넌트를 먼저 확인한다.
- 반드시, 페이지 구성 시 재사용 가능한 컴포넌트가 존재하는지 먼저 확인 후 작업을 수행할 것
- 리디자인 요청이 없다면 기존 색상과 간격 패턴을 우선 사용한다.
- 앱에 보이는 문구를 추가할 때는 한국어를 우선 사용한다.
- 개발 단계에서 직접 수정할 때 편하게 하기 위해서 기능마다 주석을 첨부해서 읽기 편하게 할 것.
- 스타일은 디자인 토큰을 따르며, 명세에 디자인토큰이 없어도 디자인 토큰과 동일한 경우 토큰을 먼저 사용할 것 
- 정확한 크기보다는, 반응형 디자인을 우선하며 작업할 것

## 소통 방식
- 기본적으로 한국어로 답변한다.
- 파일을 수정하기 전에는 무엇을 왜 바꿀지 짧게 설명한다.
- 팀에 영향을 줄 수 있는 애매한 변경은 공유 파일을 건드리기 전에 먼저 물어본다.


## 구현 대상
- 추천 레시피 피드들을 볼 수 있는 feed 페이지를 만들려고 한다.
- 해당 페이지의 라우팅 경로는 /feed 로 한다.
- 해당 구현사항에 서술하지 않은 부분들에 대해서도,보내준 이미지에 있다면 구현을 해야 한다.

### 헤더
- 프로젝트 제목과, 알람 svg가 양옆에 배치되어 있다.
- 그 아래 검색창과 28px 간격을 두고 있다.
### 검색창
-SearchButton.tsx 컴포넌트
- 그 아래 검색창과 12px 간격을 두고 있다.
### 이 달의 주제(배너 이미지)
width: 360px;
height: 280px;
- 바로 아래와 28px 간격을 두고 있다.
#### MONTH 
display: inline-flex;
padding: 6px 8px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 100px;
background: #FF4063;
- 위로 부턴 20px
- 왼쪽로부터 13px

#### 배너 이미지 텍스트
color: #FFF;
font-feature-settings: 'liga' off, 'clig' off;
font-family: "NEXON Lv1 Gothic Low OTF";
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 33.6px */
- 텍스트 내용 : 레드키위로 어디까지 마숑봤어요?
- 아래로부터 27px
- 왼쪽으로부터 26px

### 소제목
- 제목 : 당신을 위한 추천 레시피
- 부제 : 용감한 사람들이 먼저 마셨습니다
- 바로 아래와 28px 간격을 두고 있다.
#### 제목
color: #FFF;
font-feature-settings: 'liga' off, 'clig' off;
font-family: "NEXON Lv1 Gothic Low OTF";
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: 120%; /* 21.6px */

#### 부제목
color: var(--gray-300, #DADFE7);
font-feature-settings: 'liga' off, 'clig' off;
font-family: "NEXON Lv1 Gothic Low OTF";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 120%; /* 16.8px */

### 피드(gird)
- 아이폰에서 기본적으로 2줄(단, 반응형 디자인에 따라 달라져야 함)
- 피드 이미지, 제목, 부제목, 태그
- 피드를 누르면 피드 상세페이지로 이동해야 함 (상세페이지는 구현하지 말 것)
- 이미지- 제목 - 태그 사이 간격은 12px
display: flex;
width: 158px;
flex-direction: column;
align-items: flex-start;
gap: 12px;
flex-shrink: 0;

#### 제목
color: #FFF;
font-feature-settings: 'liga' off, 'clig' off;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 120%; /* 19.2px */

#### 부제목
- 
color: var(--gray-400, #B4BBC7);
font-feature-settings: 'liga' off, 'clig' off;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 120%; /* 16.8px */

#### 태그
- gray-400
display: flex;
padding: 2px 6px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 2px;
border: 0.2px solid rgba(255, 255, 255, 0.50);
background: var(--gray-800, #3A404A);
- 글씨체
color: var(--white, #FFF);
font-feature-settings: 'liga' off, 'clig' off;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 120%; /* 16.8px */


### navbar
- 피드 탭과 레시피 생성 페이지로 구성
display: inline-flex;
height: 50px;
padding: 2px 80px;
justify-content: space-between;
align-items: center;
background: #000;
box-shadow: 0 -4px 20px 0 rgba(255, 255, 255, 0.15);
이지만, safe zone 고려할 것
- 냅바 위로 디바이더가 그라데이션으로 하얀색에서 옅어질 것
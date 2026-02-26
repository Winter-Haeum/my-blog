# 📌 React MyBlog (Vite)

React로 만든 **학습 기록 + 미니 블로그** 프로젝트다.

- **배운 내용(Topics)**을 카드로 보여주고
- 각 Topic 안에 내가 쓴 글을 **저장/수정/삭제/이동/별표/조회수**까지 관리한다.
- `Zustand`로 **로그인 상태**, **전역 알림**을 관리하고, `Context`로 **글 데이터/테마**를 공급한다.

---

## ✨ Features

### 🧭 라우팅 구조 (React Router)

- `/` : 메인 페이지 (배운 내용 카드 그리드)
- `/write` : 글 작성/수정 페이지 (**로그인 필요**) 🔒
- `/login` : 로그인 페이지
- `/learn/:topic` : Topic 상세 + 내가 쓴 글 목록/관리
- `/posts/:id` : 글 상세 페이지

### 🔒 로그인 기반 보호 라우트

- `/write`는 `ProtectedRoute`로 감싸서 **로그인 상태가 아니면 `/login`으로 이동**한다.
- 로그인 후 원래 가려던 경로로 돌아가게 `location.state.from`을 사용한다.

**테스트 계정**

- Email: `test@test.com`
- Password: `1234`

### 📝 글 작성/수정 (Home.jsx)

- 글 작성 시 필수값 검증
  - 저장 위치(topic) 선택 필수
  - 제목 필수
- 글 작성 시 생성되는 데이터
  - `id`: `Date.now()` 기반 문자열
  - `createdAt`, `views`, `starred` 포함
- 글 수정 모드
  - `?edit=<id>` 쿼리로 진입
  - 수정 모드에서는 `topic` 변경 비활성화

### 📚 Topic 상세 + 글 목록 관리 (LearnDetail.jsx)

- Topic 정보를 `LEARN_TOPICS`에서 찾아서 표시
  - 상세 설명(`details`), 사용 예시(`syntax`), 문서 링크(`link`) 제공
- 내가 쓴 글 리스트 기능
  - ⭐ 별표 토글
  - ✅ 체크박스 선택
  - 전체 선택/해제
  - 선택 삭제 (confirm)
  - 선택 이동 (topic 변경)
  - 선택 1개일 때만 수정 버튼 활성화
- 정렬 규칙
  - 별표 글을 위로
  - 그 다음 최신 글이 위로

### 📄 글 상세 (PostDetail.jsx)

- 조회수 증가
  - `useRef(new Set())`로 **같은 세션에서 중복 증가 방지**
- 기능
  - 목록 이동
  - 수정 이동
  - 삭제(confirm) 후 topic 목록으로 이동
  - ⭐ 별표 토글

### 🚨 전역 알림(Global Alert)

- `useAlertStore`로 전역 메시지 관리
  - `openAlert(message, buttonText?)`
  - `closeAlert()`
- `App.jsx`에서 `GlobalAlert`를 항상 렌더링하여 어디서든 호출 가능
- 로그인 페이지에서 기본 `alert()` 대신 전역 알림 사용

### 🎨 테마 & 전역 스타일

- `ThemeProvider`로 테마 공급
- `GlobalStyle`로 전역 스타일 적용
- Emotion(`@emotion/styled`)로 스타일 작성

---

## 🎬 Live Demo

- 🌐 https://my-blog-liart-rho.vercel.app/

---

## 🛠 Tech Stack

- React 19
- Vite
- React Router DOM 7
- Zustand (로그인/알림 상태)
- Context API (Posts / Theme)
- Emotion (`@emotion/styled`, `@emotion/react`)

---

## 🧠 What I Focused On

- **보호 라우트(Protected Route)**로 로그인 전/후 흐름 설계
- **전역 알림 패턴**: 페이지가 달라도 공통으로 메시지를 띄우는 구조
- **글 데이터 관리 UI**
  - 선택/전체선택/삭제/이동 같은 “관리자형” UX 구성
- **정렬/필터링 사고**
  - starred 우선 → 최신순 정렬
- **조회수 중복 방지 가드**
  - 리렌더링이 여러 번 일어나도 조회수는 1번만 증가

---

## 📂 Folder Structure

```bash
react-myblog/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ common/
│  │  │  ├─ Container.jsx
│  │  │  ├─ Footer.jsx
│  │  │  ├─ GlobalAlert.jsx
│  │  │  └─ Header.jsx
│  │  └─ learn/
│  │     ├─ LearnCardGrid.jsx
│  │     └─ LearnCardGrid.styles.jsx
│  ├─ context/
│  │  ├─ posts/
│  │  │  └─ posts.jsx
│  │  └─ theme/
│  │     ├─ themeContext.jsx
│  │     └─ ThemeWrapper.jsx
│  ├─ data/
│  │  └─ learnTopics.js
│  ├─ hooks/
│  │  ├─ useInput.js
│  │  └─ useResponsive.js
│  ├─ layout/
│  │  └─ MainLayout.jsx
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  ├─ LearnDetail.jsx
│  │  ├─ Login.jsx
│  │  ├─ MainPage.jsx
│  │  └─ PostDetail.jsx
│  ├─ routes/
│  │  └─ ProtectedRoute.jsx
│  ├─ store/
│  │  ├─ useAlertStore.js
│  │  └─ useAuthStore.js
│  ├─ styles/
│  │  └─ GlobalStyle.jsx
│  ├─ theme.js
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
├─ package.json
└─ vite.config.js
```

---

## 🚀 Run Locally

```bash
npm install
npm run dev
```

---

## 🔑 Login Test (Quick)

```txt
Email: test@test.com
Password: 1234
```

---

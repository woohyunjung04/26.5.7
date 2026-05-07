# Checklist App

React + Vite 기반 프론트엔드와 Node.js + Express 백엔드를 포함한 체크리스트 예제 프로젝트입니다.

## 실행 방법

1. 터미널 1:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. 터미널 2:
   ```bash
   cd backend
   npm install
   node server.js
   ```

## 기능

- 작업 추가
- 작업 목록 조회
- 할 일 삭제
- 완료 상태 토글
- UI 즉시 반영

## API

- `GET /tasks`
- `POST /tasks`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

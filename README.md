# ⚾️ KBO Baseball Diary

> **"야구 시청의 재미를 더하다, 나만의 야구 아카이빙 서비스"**
>
> 매일 열리는 야구 경기, 휘발되는 감동을 기록하고 나의 직관 승률을 확인하세요.

## 📅 Project Overview
* **프로젝트 기간**: 2025.11.25 ~ 2025.12.15 (SNU 25-2 [컴퓨터 및 VLSI특강:AI를 활용한 front-end 개발] 수업 기말 프로젝트)
* **한줄 소개**: KBO 경기 결과 자동 연동을 지원하는 야구 관람 다이어리 웹 서비스
* **데모**:
  🎞️ [드라이브 링크](https://drive.google.com/file/d/1XycqA40CyzGriD2L8RVqhOis05U2pFax/view?usp=sharing)

## 🎯 Key Features

### 1. 경기 기록 자동화 (Auto-Fill)
* 날짜와 응원 팀만 선택하세요. 그날의 스코어, 상대 팀, 구장 정보를 자동으로 불러옵니다.
* 귀찮은 입력 과정 없이 '감상'에만 집중할 수 있습니다.

### 2. 캘린더 뷰 (Calendar View)
* 한 달 동안의 내 직관/집관 기록을 한눈에 볼 수 있습니다.
* 승리한 날과 패배한 날이 색상으로 구분되어 나의 '승요(승리 요정)'력을 직관적으로 파악합니다.

### 3. 나만의 통계 (Statistics)
* "내가 직관 가면 승률이 얼마나 될까?"
* 직관 승률, 집관 승률, 구장별 방문 횟수 등 팬들이 궁금해하는 데이터를 시각화합니다.

## 🛠 Tech Stack

### Frontend
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=Vite&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/> <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=reactrouter&logoColor=white"/>

### Backend
<img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=white"/>

## 🚀 Setup

The project consists of a **Frontend** (React + Vite) and a **Backend** (Node.js + Express). You need to run both concurrently.

### 1. Backend Setup
Navigate to the `backend` directory, install dependencies, and start the server.

```bash
cd backend
npm install
node ./server.js
# Server runs on http://localhost:5000 (check your server configuration)
```

### 2. Frontend Setup
Open a new terminal, navigate to the `frontend` directory, install dependencies, and start the development server.

```bash
cd frontend
npm install
npm run dev
# Client runs on http://localhost:5173 (default Vite port)
```

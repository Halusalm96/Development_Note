const fs = require("fs");
const path = require("path");

// 날짜 구성
const today = new Date();
const yyyy = today.getFullYear(); // ex. 2026
const mm = String(today.getMonth() + 1).padStart(2, "0"); // ex. 01
const dd = String(today.getDate()).padStart(2, "0"); // ex. 15
const dateStr = `${yyyy}-${mm}-${dd}`;

// 경로 설정: dev_Notes/YYYY/MM/YYYY-MM-DD.md
const folderPath = path.resolve(__dirname, "../dev_Notes", `${yyyy}`, `${mm}`);
const filePath = path.join(folderPath, `${dateStr}.md`);

// 템플릿 내용
const template = `# ${dateStr} 개발 노트

## 날짜
${dateStr}

## 오늘 한 일
- 

## 작업 내용

### UI 작업
- 

### API / 백엔드
- 

### DB / 모델
- 

### 테스트 / 문서화
- 

### 기타 작업
- 

## 문제와 해결
- 

## 배운 점 / 느낀 점
- 

## 향후 계획
- 

---

## 요약
- 작업명: 
- 핵심 내용: 
- 결과 / 성과: 
`;

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, template, "utf-8");
  console.log(`✅ 오늘 노트 생성: ${filePath}`);
} else {
  console.log(`📘 이미 존재: ${filePath}`);
}

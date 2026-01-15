const fs = require("fs");
const path = require("path");

const filePath = process.argv[2];
if (!filePath || !filePath.endsWith(".md")) {
  console.error("❌ 마크다운 파일 경로를 입력하세요.");
  process.exit(1);
}

const content = fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, ""); // BOM 제거
const lines = content.split(/\r?\n/); // 개행 방식 호환

let result = {
  date: path.basename(filePath, ".md"),
};

let currentKey = null;
let buffer = [];

function flushBuffer() {
  if (!currentKey) return;
  const trimmed = buffer.map(line => line.trim()).filter(Boolean);
  result[currentKey] = trimmed;
  buffer = [];
}

for (let line of lines) {
  const headerMatch = line.match(/^#{1,6}\s*(.+)$/);
  if (headerMatch) {
    flushBuffer();
    currentKey = headerMatch[1]
  .trim()
  .replace(/[\s]+/g, "_") // 공백은 _
  .replace(/[^\w가-힣]/g, ""); // 한글 + 영문/숫자만 남김

    continue;
  }
  if (currentKey) {
    buffer.push(line);
  }
}
flushBuffer();

for (let key in result) {
  const value = result[key];
  if (Array.isArray(value)) {
    const cleaned = value.map(v => v.replace(/^[-*>]\s*/, "").trim()).filter(Boolean);
    result[key] = cleaned.length === 1 ? cleaned[0] : cleaned;
  }
}

const outPath = filePath.replace(".md", ".json");
fs.writeFileSync(outPath, JSON.stringify(result, null, 2), "utf-8");
console.log(`JSON 저장 완료: ${outPath}`);

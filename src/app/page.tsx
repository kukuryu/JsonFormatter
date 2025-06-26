// src/app/page.tsx

"use client";

import { useState } from "react";

export default function Home() {
  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [error, setError] = useState("");

  // --- 여기부터 수정 ---

  // 포맷팅 버튼 클릭 시 실행될 함수
  const handleFormat = () => {
    // 입력값이 없으면 아무것도 하지 않음
    if (!inputJson.trim()) {
      setError("Please paste some JSON data first.");
      setOutputJson("");
      return;
    }

    try {
      // 1. 입력된 문자열을 JavaScript 객체로 파싱(변환)
      const parsedJson = JSON.parse(inputJson);
      // 2. 파싱된 객체를 보기 좋은 형태의 문자열로 변환
      // (null, 2)는 모든 속성을 포함하고, 2칸 들여쓰기를 의미
      const formattedString = JSON.stringify(parsedJson, null, 2);

      // 3. 변환된 문자열을 상태에 저장하고, 에러 메시지는 초기화
      setOutputJson(formattedString);
      setError("");
    } catch (e: any) {
      // 4. JSON 파싱 중 에러가 발생하면 에러 메시지를 상태에 저장
      setError(`Invalid JSON: ${e.message}`);
      setOutputJson(""); // 출력창은 비움
    }
  };

  // 지우기 버튼 클릭 시 실행될 함수 (이전과 동일)
  const handleClear = () => {
    setInputJson("");
    setOutputJson("");
    setError("");
  };

  // 복사하기 버튼 클릭 시 실행될 함수
  const handleCopy = () => {
    // 출력창에 내용이 없으면 복사하지 않음
    if (!outputJson || error) {
      alert("There is nothing to copy!");
      return;
    }

    // 최신 브라우저의 Clipboard API를 사용하여 텍스트 복사
    navigator.clipboard.writeText(outputJson).then(
      () => {
        // 복사 성공 시 사용자에게 알림
        alert("Formatted JSON copied to clipboard!");
      },
      (err) => {
        // 복사 실패 시 에러를 콘솔에 출력
        console.error("Could not copy text: ", err);
        alert("Failed to copy text.");
      }
    );
  };

  return (
    <main className="flex flex-col items-center p-4 sm:p-8 md:p-12 bg-gray-50 min-h-screen">
      <div className="w-full max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
            JSON Formatter
          </h1>
          <p className="text-gray-500 mt-2">
            Simply JSON Formatting 데이터를 붙여넣고 보기 쉽게 정리하세요.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Input</h2>
            <textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              placeholder="여기에 JSON 데이터를 붙여넣으세요..."
              className="w-full h-96 p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Output</h2>
            <pre className="w-full h-96 p-4 border border-gray-300 rounded-md bg-white overflow-auto focus:outline-none focus:ring-2 focus:ring-blue-500">
              <code className="font-mono text-sm">
                {error ? (
                  <span className="text-red-500">{error}</span>
                ) : (
                  outputJson
                )}
              </code>
            </pre>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 my-6">
          <button
            onClick={handleFormat}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            Format JSON
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleCopy}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </main>
  );
}
// src/app/page.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // Shadcn/ui 버튼
import { Textarea } from "@/components/ui/textarea"; // Shadcn/ui 텍스트에어리어
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Shadcn/ui 카드
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion" // Accordion 임포트

export default function Home() {
  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [error, setError] = useState("");

  const handleFormat = () => {
    if (!inputJson.trim()) {
      setError("Please paste some JSON data first.");
      setOutputJson("");
      return;
    }
    try {
      const parsedJson = JSON.parse(inputJson);
      const formattedString = JSON.stringify(parsedJson, null, 2);
      setOutputJson(formattedString);
      setError("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
      setOutputJson("");
    }
  };

  const handleClear = () => {
    setInputJson("");
    setOutputJson("");
    setError("");
  };

  const handleCopy = () => {
    if (!outputJson || error) {
      alert("There is nothing to copy!");
      return;
    }
    navigator.clipboard.writeText(outputJson).then(
      () => {
        alert("Formatted JSON copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
        alert("Failed to copy text.");
      }
    );
  };

  return (
    <main className="flex flex-col items-center p-4 sm:p-8 md:p-12 min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-200">
            JSON Formatter
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Paste your JSON data to format it beautifully.
          </p>
        </header>

        {/* 메인 레이아웃: 입력창과 출력창 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>Paste your JSON here.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                placeholder="여기에 JSON 데이터를 붙여넣으세요..."
                className="w-full h-96 font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Output</CardTitle>
              <CardDescription>
                Formatted JSON will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="w-full h-96 p-4 rounded-md bg-slate-100 dark:bg-slate-800 overflow-auto">
                <code className="font-mono text-sm whitespace-pre-wrap">
                  {error ? (
                    <span className="text-red-500">{error}</span>
                  ) : (
                    outputJson || " "
                  )}
                </code>
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* 중앙: 컨트롤 버튼 */}
        <div className="flex justify-center items-center gap-4 my-6">
          <Button onClick={handleFormat}>Format JSON</Button>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="outline" onClick={handleCopy}>
            Copy to Clipboard
          </Button>
        </div>
      </div>
      {/* ================================================================== */}
      {/* =================  여기부터 설명 콘텐츠 섹션  ================== */}
      {/* ================================================================== */}

      <div className="w-full max-w-4xl mx-auto mt-16 text-slate-700 dark:text-slate-300">
        <div className="space-y-10">
          <div>
            <h2 className="text-3xl font-bold text-center mb-6">
              About Our JSON Formatter
            </h2>
            <p className="text-lg text-center text-slate-500 dark:text-slate-400 mb-8">
              더 빠르고, 더 직관적인 JSON 데이터 관리를 경험해 보세요.
            </p>
          </div>

          {/* Feature 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-3">
                JSON이란 무엇인가요?
              </h3>
              <p>
                JSON(JavaScript Object Notation)은 사람이 읽고 쓰기 쉬우며,
                동시에 기계가 파싱하고 생성하기도 쉬운 경량의 데이터 교환
                형식입니다. 주로 웹 애플리케이션에서 서버와 클라이언트 간에
                데이터를 주고받을 때 널리 사용됩니다.
              </p>
            </div>
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <pre>
                <code className="font-mono text-sm">
                  {`{
  "name": "John Doe",
  "age": 30,
  "isStudent": false
}`}
                </code>
              </pre>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg md:order-last">
              <h3 className="text-xl font-semibold mb-2">간편한 사용법</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>복잡한 JSON 데이터를 왼쪽 창에 붙여넣으세요.</li>
                <li>&apos;Format&apos; 버튼을 클릭하여 즉시 변환하세요.</li>
                <li>깔끔하게 정렬된 결과를 확인하고 복사하세요.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3">
                왜 포맷터가 필요한가요?
              </h3>
              <p>
                API 응답이나 데이터 파일에서 받은 JSON은 종종 한 줄로 압축되어
                있어 가독성이 매우 떨어집니다. JSON 포맷터는 들여쓰기와 줄
                바꿈을 적용하여 데이터의 구조를 한눈에 파악할 수 있게 도와주어,
                개발자의 디버깅 시간과 실수를 크게 줄여줍니다.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          {/* <div>
            <h3 className="text-2xl font-semibold text-center mb-6">
              자주 묻는 질문 (FAQ)
            </h3>
            <div className="space-y-4">
              <details className="p-4 border rounded-lg bg-slate-100 dark:bg-slate-800">
                <summary className="font-semibold cursor-pointer">
                  Q: 이 도구는 무료인가요?
                </summary>
                <p className="mt-2">
                  네, 이 JSON 포맷터는 완전히 무료로 제공됩니다. 자유롭게
                  사용하고 동료에게 공유하세요!
                </p>
              </details>
              <details className="p-4 border rounded-lg bg-slate-100 dark:bg-slate-800">
                <summary className="font-semibold cursor-pointer">
                  Q: 제 데이터는 안전한가요?
                </summary>
                <p className="mt-2">
                  네, 안전합니다. 모든 포맷팅 과정은 사용자님의 웹 브라우저
                  내에서만(클라이언트 사이드) 이루어집니다. 어떠한 데이터도 저희
                  서버로 전송되거나 저장되지 않습니다.
                </p>
              </details>
            </div>
          </div> */}
          <div>
            <h3 className="text-2xl font-semibold text-center mb-6">자주 묻는 질문 (FAQ)</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Q: 이 도구는 무료인가요?</AccordionTrigger>
                <AccordionContent>
                  네, 이 JSON 포맷터는 완전히 무료로 제공됩니다. 자유롭게 사용하고 동료에게 공유하세요!
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Q: 제 데이터는 안전한가요?</AccordionTrigger>
                <AccordionContent>
                  네, 안전합니다. 모든 포맷팅 과정은 사용자님의 웹 브라우저 내에서만(클라이언트 사이드) 이루어집니다. 어떠한 데이터도 저희 서버로 전송되거나 저장되지 않습니다.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
        </div>
      </div>
    </main>
  );
}

// src/app/page.tsx

"use client";

import { useRef, useState } from "react";
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
// 자동광고만 사용할 것이므로 배너 컴포넌트 제거

const SAMPLE_JSON = `{
  "user": {
    "id": 123,
    "name": "Jane Doe",
    "email": "jane@example.com"
  },
  "roles": ["admin", "editor"],
  "active": true,
  "profile": {
    "joinedAt": "2024-08-01T10:20:30.000Z",
    "score": 9876
  }
}`;

function computeInitialOutput(sample: string, indent: number) {
  try {
    return JSON.stringify(JSON.parse(sample), null, indent);
  } catch {
    return "";
  }
}

export default function Home() {
  const [inputJson, setInputJson] = useState(SAMPLE_JSON);
  const [outputJson, setOutputJson] = useState(computeInitialOutput(SAMPLE_JSON, 2));
  const [error, setError] = useState("");
  const [indent, setIndent] = useState<number>(2);
  const [sortKeys, setSortKeys] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFormat = () => {
    if (!inputJson.trim()) {
      setError("Please paste some JSON data first.");
      setOutputJson("");
      return;
    }
    try {
      const parsedJson = JSON.parse(inputJson);
      const normalized = sortKeys ? sortObjectDeep(parsedJson) : parsedJson;
      const formattedString = JSON.stringify(normalized, null, indent);
      setOutputJson(formattedString);
      setError("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const message: string = e?.message || "Invalid JSON";
      const enhanced = enhanceJsonError(message, inputJson);
      setError(enhanced);
      setOutputJson("");
    }
  };

  const handleMinify = () => {
    if (!inputJson.trim()) {
      setError("Please paste some JSON data first.");
      setOutputJson("");
      return;
    }
    try {
      const parsedJson = JSON.parse(inputJson);
      const normalized = sortKeys ? sortObjectDeep(parsedJson) : parsedJson;
      const minified = JSON.stringify(normalized);
      setOutputJson(minified);
      setError("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const message: string = e?.message || "Invalid JSON";
      const enhanced = enhanceJsonError(message, inputJson);
      setError(enhanced);
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

  const handleValidate = () => {
    if (!inputJson.trim()) {
      setError("Please paste some JSON data first.");
      setOutputJson("");
      return;
    }
    try {
      const parsed = JSON.parse(inputJson);
      setError("");
      setOutputJson(JSON.stringify(parsed, null, indent));
      alert("Valid JSON ✔");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const message: string = e?.message || "Invalid JSON";
      const enhanced = enhanceJsonError(message, inputJson);
      setError(enhanced);
      setOutputJson("");
    }
  };

  const handleDownload = () => {
    const content = outputJson || inputJson;
    if (!content.trim()) {
      alert("There is nothing to download!");
      return;
    }
    const blob = new Blob([content], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      setInputJson(text);
      setError("");
    };
    reader.onerror = () => {
      alert("Failed to read file.");
    };
    reader.readAsText(file);
    // reset input so onChange will fire for the same file again later
    e.currentTarget.value = "";
  };

  function sortObjectDeep(value: unknown): unknown {
    if (Array.isArray(value)) {
      return value.map(sortObjectDeep);
    }
    if (value !== null && typeof value === "object") {
      const sorted: Record<string, unknown> = {};
      Object.keys(value as Record<string, unknown>)
        .sort((a, b) => a.localeCompare(b))
        .forEach((key) => {
          sorted[key] = sortObjectDeep((value as Record<string, unknown>)[key]);
        });
      return sorted;
    }
    return value;
  }

  function enhanceJsonError(message: string, source: string) {
    // 일반적으로 V8: "Unexpected token ... in JSON at position 123"
    const match = message.match(/position\s+(\d+)/i);
    if (!match) return `Invalid JSON: ${message}`;
    const pos = Number(match[1]);
    const { line, column } = getLineCol(source, pos);
    return `Invalid JSON at line ${line}, column ${column}: ${message}`;
  }

  function getLineCol(text: string, index: number) {
    let line = 1;
    let col = 1;
    for (let i = 0; i < text.length && i < index; i++) {
      const ch = text.charAt(i);
      if (ch === "\n") {
        line++;
        col = 1;
      } else {
        col++;
      }
    }
    return { line, column: col };
  }

  return (
    <main className="flex flex-col items-center p-4 sm:p-8 md:p-12 min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-200">
            JSON Formatter
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Paste your JSON and format, validate, or minify it instantly — offline and secure.
          </p>
        </header>

        {/* 자동광고 사용: 별도 배너 삽입 없음 */}

        {/* 메인 레이아웃: 입력창과 출력창 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>Paste JSON here or upload a file.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                placeholder="여기에 JSON 데이터를 붙여넣으세요..."
                className="w-full h-96 font-mono text-sm resize-none"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json,.txt"
                className="hidden"
                onChange={handleUploadFile}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Output</CardTitle>
              <CardDescription>
                Formatted/minified JSON will appear here.
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

        {/* 중앙: 컨트롤 */}
        <div className="flex flex-col items-center gap-4 my-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Indent
              <select
                value={indent}
                onChange={(e) => setIndent(Number(e.target.value))}
                className="ml-2 rounded-md border px-2 py-1 bg-white dark:bg-slate-800"
              >
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={6}>6</option>
                <option value={8}>8</option>
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={sortKeys}
                onChange={(e) => setSortKeys(e.target.checked)}
              />
              Sort keys
            </label>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3">
            <Button onClick={handleFormat}>Format</Button>
            <Button variant="secondary" onClick={handleMinify}>Minify</Button>
            <Button variant="outline" onClick={handleValidate}>Validate</Button>
            <Button variant="outline" onClick={handleCopy}>Copy</Button>
            <Button variant="outline" onClick={handleDownload}>Download</Button>
            <Button variant="ghost" onClick={handleUploadClick}>Upload</Button>
            <Button variant="ghost" onClick={handleClear}>Clear</Button>
          </div>
        </div>

        {/* 자동광고 사용: 별도 배너 삽입 없음 */}
      </div>
      {/* ================================================================== */}
      {/* =================  여기부터 설명 콘텐츠 섹션  ================== */}
      {/* ================================================================== */}

      <div className="w-full max-w-4xl mx-auto mt-16 text-slate-700 dark:text-slate-300">
        <div className="space-y-10">
          <div>
              <h2 className="text-3xl font-bold text-center mb-6">About Our JSON Formatter</h2>
              <p className="text-lg text-center text-slate-500 dark:text-slate-400 mb-8">
                Experience faster and more intuitive JSON management in your browser.
              </p>
          </div>

          {/* Feature 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
                <h3 className="text-2xl font-semibold mb-3">What is JSON?</h3>
              <p>
                  JSON (JavaScript Object Notation) is a lightweight data-interchange format
                  that is easy for humans to read and write, and easy for machines to parse and generate.
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
                <h3 className="text-xl font-semibold mb-2">How to use</h3>
              <ul className="list-disc list-inside space-y-2">
                  <li>Paste your JSON into the left panel.</li>
                  <li>Click ‘Format’ to pretty-print instantly.</li>
                  <li>Copy or download the result from the right panel.</li>
              </ul>
            </div>
            <div>
                <h3 className="text-2xl font-semibold mb-3">Why use a formatter?</h3>
              <p>
                  API responses and data files often come minified on a single line.
                  A formatter applies indentation and line breaks so you can quickly
                  understand structure, reducing debugging time and mistakes.
              </p>
            </div>
          </div>

            {/* Best Practices */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">JSON Best Practices</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Use clear, consistent key names (e.g., lower camelCase).</li>
                <li>Prefer ISO 8601 strings (UTC) for date/time.</li>
                <li>Distinguish between null and empty strings.</li>
                <li>Avoid unnecessary nesting; keep a consistent schema.</li>
                <li>Do not mix number/string types; validate with a schema.</li>
              </ul>
            </div>

            {/* Common Errors */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Common Errors</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Trailing commas after the last item are not allowed.</li>
                <li>Use double quotes for keys and strings, not single quotes.</li>
                <li>JSON does not support comments.</li>
                <li>NaN/Infinity are not valid JSON numbers.</li>
              </ul>
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

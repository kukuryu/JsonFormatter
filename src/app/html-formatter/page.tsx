"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { html as beautifyHtml } from "js-beautify";

const SAMPLE_HTML = `<!DOCTYPE html><html><head><title>Sample</title></head><body><div class="container"><h1>Hello World</h1><p>This is a sample HTML document.</p><ul><li>Item 1</li><li>Item 2</li></ul></div></body></html>`;

function computeInitialOutput(sample: string, indent: number) {
  try {
    return beautifyHtml(sample, {
      indent_size: indent,
      preserve_newlines: false,
      max_preserve_newlines: 0,
    });
  } catch {
    return "";
  }
}

export default function HtmlFormatter() {
  const [inputHtml, setInputHtml] = useState(SAMPLE_HTML);
  const [outputHtml, setOutputHtml] = useState(computeInitialOutput(SAMPLE_HTML, 2));
  const [error, setError] = useState("");
  const [indent, setIndent] = useState<number>(2);
  const [preserveNewlines, setPreserveNewlines] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const handleFormat = () => {
    if (!inputHtml.trim()) {
      setError("Please paste some HTML code first.");
      setOutputHtml("");
      return;
    }
    try {
      const formatted = beautifyHtml(inputHtml, {
        indent_size: indent,
        preserve_newlines: preserveNewlines,
        max_preserve_newlines: preserveNewlines ? 2 : 0,
        wrap_line_length: 0,
        end_with_newline: true,
      });
      setOutputHtml(formatted);
      setError("");
    } catch (e: any) {
      const message: string = e?.message || "Failed to format HTML";
      setError(`Error formatting HTML: ${message}`);
      setOutputHtml("");
    }
  };

  const handleMinify = () => {
    if (!inputHtml.trim()) {
      setError("Please paste some HTML code first.");
      setOutputHtml("");
      return;
    }
    try {
      const minified = inputHtml
        .replace(/>\s+</g, '><')
        .replace(/\s{2,}/g, ' ')
        .trim();
      setOutputHtml(minified);
      setError("");
    } catch (e: any) {
      const message: string = e?.message || "Failed to minify HTML";
      setError(`Error minifying HTML: ${message}`);
      setOutputHtml("");
    }
  };

  const handleClear = () => {
    setInputHtml("");
    setOutputHtml("");
    setError("");
  };

  const handleCopy = () => {
    if (!outputHtml || error) {
      alert("There is nothing to copy!");
      return;
    }
    navigator.clipboard.writeText(outputHtml).then(
      () => {
        alert("Formatted HTML copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
        alert("Failed to copy text.");
      }
    );
  };

  const handleValidate = () => {
    if (!inputHtml.trim()) {
      setError("Please paste some HTML code first.");
      setOutputHtml("");
      return;
    }

    // Basic HTML validation
    const parser = new DOMParser();
    const doc = parser.parseFromString(inputHtml, 'text/html');
    const parserErrors = doc.querySelectorAll('parsererror');

    if (parserErrors.length > 0) {
      setError("HTML has syntax errors");
      setOutputHtml("");
    } else {
      setError("");
      handleFormat();
      alert("Valid HTML ✔");
    }
  };

  const handleDownload = () => {
    const content = outputHtml || inputHtml;
    if (!content.trim()) {
      alert("There is nothing to download!");
      return;
    }
    const blob = new Blob([content], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.html";
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
      setInputHtml(text);
      setError("");
    };
    reader.onerror = () => {
      alert("Failed to read file.");
    };
    reader.readAsText(file);
    e.currentTarget.value = "";
  };

  return (
    <main className="flex flex-col items-center p-4 sm:p-8 md:p-12 bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-200">
            HTML Formatter
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Format, beautify, and minify your HTML code instantly — offline and secure.
          </p>
        </header>


        {/* Main editor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>Paste HTML here or upload a file.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={inputHtml}
                onChange={(e) => setInputHtml(e.target.value)}
                placeholder="Paste HTML here..."
                className="w-full h-96 font-mono text-sm resize-none"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="text/html,.html,.htm"
                className="hidden"
                onChange={handleUploadFile}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Output</CardTitle>
              <CardDescription>
                Formatted/minified HTML will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="w-full h-96 p-4 rounded-md bg-slate-100 dark:bg-slate-800 overflow-auto">
                <code className="font-mono text-sm whitespace-pre-wrap">
                  {error ? (
                    <span className="text-red-500">{error}</span>
                  ) : (
                    outputHtml || " "
                  )}
                </code>
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
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
                checked={preserveNewlines}
                onChange={(e) => setPreserveNewlines(e.target.checked)}
              />
              Preserve newlines
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

      </div>

      {/* Content section for policy */}
      <div className="w-full max-w-4xl mx-auto mt-16 text-slate-700 dark:text-slate-300">
        <div className="space-y-10">
          <div>
            <h2 className="text-3xl font-bold text-center mb-6">About Our HTML Formatter</h2>
            <p className="text-lg text-center text-slate-500 dark:text-slate-400 mb-8">
              Clean, format, and optimize your HTML code for better readability and maintenance.
            </p>
          </div>

          {/* Feature 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-3">What is HTML?</h3>
              <p>
                HTML (HyperText Markup Language) is the standard markup language for creating web pages.
                It describes the structure of a web page using elements and tags.
              </p>
            </div>
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <pre>
                <code className="font-mono text-sm">
                  {`<div class="container">
  <h1>Hello World</h1>
  <p>Welcome to HTML!</p>
</div>`}
                </code>
              </pre>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg md:order-last">
              <h3 className="text-xl font-semibold mb-2">How to use</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Paste your HTML code into the left panel.</li>
                <li>Click 'Format' to beautify your code.</li>
                <li>Use 'Minify' to compress HTML for production.</li>
                <li>Copy or download the result.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3">Why format HTML?</h3>
              <p>
                Properly formatted HTML improves code readability, makes debugging easier,
                and helps maintain consistent coding standards across your project.
                It's essential for collaborative development.
              </p>
            </div>
          </div>

          {/* Best Practices */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">HTML Best Practices</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Use semantic HTML5 elements (header, main, section, etc.).</li>
              <li>Always include proper DOCTYPE declaration.</li>
              <li>Use lowercase for tag names and attributes.</li>
              <li>Quote attribute values consistently.</li>
              <li>Include alt attributes for images.</li>
              <li>Validate your HTML for accessibility and standards compliance.</li>
            </ul>
          </div>

          {/* Common Issues */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Common HTML Issues</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Unclosed tags can break layout and styling.</li>
              <li>Missing quotes around attribute values.</li>
              <li>Incorrect nesting of elements.</li>
              <li>Using deprecated HTML elements or attributes.</li>
              <li>Missing required attributes (like alt for images).</li>
            </ul>
          </div>

          {/* FAQ Section */}
          <div>
            <h3 className="text-2xl font-semibold text-center mb-6">FAQ</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is this HTML formatter free?</AccordionTrigger>
                <AccordionContent>
                  Yes. This HTML formatter is completely free to use with no limitations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is my HTML code safe?</AccordionTrigger>
                <AccordionContent>
                  All processing happens in your browser. No HTML code is sent to our servers.
                  Your code remains completely private and secure.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What's the difference between Format and Minify?</AccordionTrigger>
                <AccordionContent>
                  Format adds proper indentation and line breaks for readability.
                  Minify removes unnecessary whitespace to reduce file size for production use.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </main>
  );
}
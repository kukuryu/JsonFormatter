"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: "문의",
  description: "JSON Formatter 문의 페이지",
};

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // 실제 전송 백엔드가 없으므로 임시 완료 처리
    setSent(true);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">문의</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        기능 제안이나 버그 제보가 있다면 아래 폼을 통해 알려주세요.
      </p>
      {sent ? (
        <div className="rounded-md border p-4 text-sm">문의가 접수되었습니다. 감사합니다!</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm">
            이메일 (선택)
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="mt-1 w-full rounded-md border px-3 py-2 bg-white dark:bg-slate-800"
            />
          </label>
          <label className="block text-sm">
            메시지
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="개선 제안, 버그 제보 등을 적어주세요."
              className="mt-1 h-40"
            />
          </label>
          <Button type="submit" disabled={!message.trim()}>
            보내기
          </Button>
        </form>
      )}
    </main>
  );
}



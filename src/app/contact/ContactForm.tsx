"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const recipient = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!recipient) {
      alert("Contact email is not configured. Set NEXT_PUBLIC_CONTACT_EMAIL in your environment.");
      return;
    }
    const subject = "JSON Formatter Feedback";
    const lines = [
      `From: ${email || "(not provided)"}`,
      "",
      message,
    ];
    const body = encodeURIComponent(lines.join("\n"));
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailto;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-md border p-4 text-sm">Your message has been sent. Thank you!</div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!recipient && (
        <div className="rounded-md border p-3 text-xs text-amber-700 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-200">
          Set <code>NEXT_PUBLIC_CONTACT_EMAIL</code> to enable email submission.
        </div>
      )}
      <label className="block text-sm">
        Email (optional)
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="mt-1 w-full rounded-md border px-3 py-2 bg-white dark:bg-slate-800"
        />
      </label>
      <label className="block text-sm">
        Message
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your suggestion or report an issue."
          className="mt-1 h-40"
        />
      </label>
      <Button type="submit" disabled={!message.trim()}>
        Send
      </Button>
    </form>
  );
}



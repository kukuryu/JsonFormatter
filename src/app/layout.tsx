import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://json-formatter.example.com";
// 자동광고만 사용할 것이므로 환경변수 분기 제거

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JSON Formatter · JSON 포맷터/검증/미니파이",
    template: "%s · JSON Formatter",
  },
  description:
    "JSON을 브라우저에서 안전하게 포맷/검증/미니파이 합니다. 데이터는 서버로 전송되지 않습니다.",
  keywords: [
    "JSON",
    "JSON Formatter",
    "JSON 포맷터",
    "미니파이",
    "검증",
    "정렬",
    "들여쓰기",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "JSON Formatter · JSON 포맷터/검증/미니파이",
    description:
      "JSON을 브라우저에서 안전하게 포맷/검증/미니파이 합니다. 데이터는 서버로 전송되지 않습니다.",
    siteName: "JSON Formatter",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter · JSON 포맷터/검증/미니파이",
    description:
      "JSON을 브라우저에서 안전하게 포맷/검증/미니파이 합니다. 데이터는 서버로 전송되지 않습니다.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9152326797358801"
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          // JSON-LD for WebApplication schema
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'JSON Formatter',
              url: siteUrl,
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Web',
              description:
                'JSON을 브라우저에서 안전하게 포맷/검증/미니파이 하는 무료 툴',
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <nav className="border-b bg-white/60 backdrop-blur dark:bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
              <Link href="/" className="text-lg font-semibold">JSON Formatter</Link>
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                <Link href="/about" className="hover:underline">소개</Link>
                <Link href="/privacy" className="hover:underline">개인정보처리방침</Link>
                <Link href="/terms" className="hover:underline">이용약관</Link>
                <Link href="/contact" className="hover:underline">문의</Link>
              </div>
            </div>
          </nav>
          <div className="flex-1">{children}</div>
          <footer className="mt-12 border-t">
            <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-500 dark:text-slate-400 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} JSON Formatter. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:underline">개인정보처리방침</Link>
                <Link href="/terms" className="hover:underline">이용약관</Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

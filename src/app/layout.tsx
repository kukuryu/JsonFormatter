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
// Using auto ads only; removed env conditionals

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JSON Formatter · Format, Validate, Minify",
    template: "%s · JSON Formatter",
  },
  description:
    "Safely format, validate, and minify JSON in your browser. No data leaves your device.",
  keywords: [
    "JSON",
    "JSON formatter",
    "format JSON",
    "minify JSON",
    "validate JSON",
    "sort keys",
    "indent",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "JSON Formatter · Format, Validate, Minify",
    description:
      "Safely format, validate, and minify JSON in your browser. No data leaves your device.",
    siteName: "JSON Formatter",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter · Format, Validate, Minify",
    description:
      "Safely format, validate, and minify JSON in your browser. No data leaves your device.",
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
    <html lang="en">
      <head>
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
                'Free tool to format, validate, and minify JSON safely in your browser',
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
                <Link href="/about" className="hover:underline">About</Link>
                <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                <Link href="/terms" className="hover:underline">Terms</Link>
                <Link href="/contact" className="hover:underline">Contact</Link>
              </div>
            </div>
          </nav>
          <div className="flex-1">{children}</div>
          <footer className="mt-12 border-t">
            <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-500 dark:text-slate-400 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} JSON Formatter. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                <Link href="/terms" className="hover:underline">Terms</Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

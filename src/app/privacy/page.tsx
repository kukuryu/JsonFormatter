export const metadata = {
  title: "Privacy Policy",
  description: "JSON Formatter Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-4">
        We do not send or store your JSON data on our servers. All processing happens solely in your browser.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Personal Data</h2>
      <p className="mb-2">We do not collect personal information through this tool.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Cookies and Ads</h2>
      <p className="mb-2">
        We may use third-party ad networks such as Google AdSense. Ad partners may use cookies to serve personalized ads.
        You can block or remove cookies via your browser settings.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p>For privacy inquiries, please use the contact page.</p>
    </main>
  );
}



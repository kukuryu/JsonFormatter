export const metadata = {
  title: "Terms",
  description: "JSON Formatter Terms of Service",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-4">
        This service is provided &quot;as is&quot;. To the extent permitted by law, we are not liable for any direct or indirect damages
        arising from the use of this service.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Do not use for unlawful purposes</li>
        <li>Features and content are subject to change without notice</li>
        <li>Free to use for personal or work use</li>
      </ul>
    </main>
  );
}



export const metadata = {
  title: "About",
  description: "About JSON Formatter",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        JSON Formatter is a free, browser-based utility to format, validate, and minify JSON
        without sending your data to any server.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Client-side processing for privacy</li>
        <li>Indent selection, deep key sorting, and minify</li>
        <li>Upload/Download and copy helpers</li>
      </ul>
    </main>
  );
}



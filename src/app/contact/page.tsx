export const metadata = {
  title: "Contact",
  description: "Contact JSON Formatter",
};

import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        Have a feature idea or found a bug? Send us a message below.
      </p>
      <ContactForm />
    </main>
  );
}



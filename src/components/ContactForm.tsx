"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    question: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      // Use AWS Lambda endpoint for contact form submission
      const endpoint = process.env.NEXT_PUBLIC_LAMBDA_ENDPOINT || "/api/contact";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setFormData({ name: "", email: "", telephone: "", question: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-navy">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border border-navy/20 px-4 py-2 text-navy placeholder-navy/40 transition-colors focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-navy">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border border-navy/20 px-4 py-2 text-navy placeholder-navy/40 transition-colors focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="telephone" className="block text-sm font-medium text-navy">
          Telephone *
        </label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border border-navy/20 px-4 py-2 text-navy placeholder-navy/40 transition-colors focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div>
        <label htmlFor="question" className="block text-sm font-medium text-navy">
          Question *
        </label>
        <textarea
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 w-full rounded-lg border border-navy/20 px-4 py-2 text-navy placeholder-navy/40 transition-colors focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
          placeholder="What would you like to discuss?"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-teal px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-cream disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <div className="rounded-lg bg-teal/10 p-4 text-sm text-teal">
          ✓ Thanks for reaching out! I'll get back to you soon.
        </div>
      )}

      {status === "error" && (
        <div className="rounded-lg bg-rose/10 p-4 text-sm text-rose">
          ✕ {errorMessage}
        </div>
      )}
    </form>
  );
}

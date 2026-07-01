"use client";

import { useState, useCallback, useEffect } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  /* Auto-clear success message after 3 seconds */
  useEffect(() => {
    if (status !== "sent") return;
    const timer = setTimeout(() => {
      setStatus("idle");
      setEmail("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      /* Client-side validation */
      if (!EMAIL_RE.test(email.trim())) {
        setStatus("error");
        setErrorMessage("Please enter a valid email address.");
        return;
      }

      setStatus("sending");
      setErrorMessage("");

      try {
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim() }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          setStatus("error");
          setErrorMessage(data.error ?? "Something went wrong.");
          return;
        }

        setStatus("sent");
      } catch {
        setStatus("error");
        setErrorMessage("Network error. Please try again.");
      }
    },
    [email],
  );

  return (
    <section aria-labelledby="newsletter-heading" className="w-full">
      <h3
        id="newsletter-heading"
        className="font-[family-name:var(--font-condensed)] font-bold text-xs uppercase tracking-[0.12em] text-white mb-2"
      >
        Stay Updated
      </h3>
      <p className="text-white/50 text-sm mb-4">
        Get the latest product launches and industry news.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2"
        noValidate
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={status === "sending" || status === "sent"}
          className="flex-1 min-w-0 rounded-[var(--radius-brand)] bg-white/[0.08] border border-white/[0.12] px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="shrink-0 rounded-[var(--radius-brand)] px-6 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-50"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          {status === "sending"
            ? "Sending…"
            : status === "sent"
              ? "Subscribed!"
              : "Subscribe"}
        </button>
      </form>

      {/* Feedback messages */}
      {status === "error" && (
        <p className="mt-2 text-sm text-red-400" role="alert">
          {errorMessage}
        </p>
      )}
      {status === "sent" && (
        <p className="mt-2 text-sm text-green-400" role="status">
          Subscribed! Thank you for signing up.
        </p>
      )}
    </section>
  );
}

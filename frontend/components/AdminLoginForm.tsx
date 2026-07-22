"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { loginAdmin } from "@/lib/api";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      await loginAdmin(email, password);
      router.push("/admin");
    } catch {
      setError("Admin login failed. Check credentials and backend configuration.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <label className="grid gap-2 text-sm font-medium text-slate-800">
        Email
        <input
          autoComplete="email"
          className="rounded-md border border-slate-300 px-4 py-3 text-base"
          name="email"
          type="email"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-800">
        Password
        <input
          autoComplete="current-password"
          className="rounded-md border border-slate-300 px-4 py-3 text-base"
          name="password"
          type="password"
        />
      </label>
      <button
        className="rounded-md bg-emerald-900 px-5 py-3 font-semibold text-white disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Signing in" : "Sign in"}
      </button>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </form>
  );
}

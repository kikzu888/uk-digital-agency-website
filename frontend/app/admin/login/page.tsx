import type { Metadata } from "next";
import Link from "next/link";

import { AdminLoginForm } from "@/components/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="mx-auto grid min-h-screen max-w-md content-center px-6 py-16">
      <Link className="mb-8 text-sm font-semibold text-emerald-900" href="/">
        Back to website
      </Link>
      <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-900">VenusCore</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">Admin Login</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Sign in with configured admin credentials. Open registration is disabled.
        </p>
        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}

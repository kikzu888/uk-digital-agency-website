"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ContactSubmission, fetchContactSubmissions, logoutAdmin } from "@/lib/api";

export function AdminDashboard() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    fetchContactSubmissions()
      .then((data) => {
        setSubmissions(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  async function signOut() {
    await logoutAdmin().catch(() => undefined);
    window.location.href = "/admin/login";
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-900">Admin</p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-950">Dashboard</h1>
        </div>
        <div className="flex gap-3">
          <Link className="rounded-md border border-slate-300 px-4 py-2 font-semibold" href="/">
            View site
          </Link>
          <button className="rounded-md bg-slate-950 px-4 py-2 font-semibold text-white" onClick={signOut} type="button">
            Sign out
          </button>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-slate-950">Contact submissions</h2>
        {status === "loading" ? <p className="mt-4 text-slate-600">Loading submissions.</p> : null}
        {status === "error" ? (
          <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-slate-700">
            Sign in again or check that the backend admin API is configured.
          </div>
        ) : null}
        {status === "ready" && submissions.length === 0 ? (
          <p className="mt-4 text-slate-600">No submissions yet.</p>
        ) : null}
        {submissions.length > 0 ? (
          <div className="mt-5 overflow-x-auto rounded-md border border-slate-200 bg-white">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Company</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Budget</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr className="border-t border-slate-200" key={submission.id}>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-slate-950">
                        {submission.first_name} {submission.last_name}
                      </span>
                      <span className="block text-slate-500">{submission.email}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{submission.company_name}</td>
                    <td className="px-4 py-3 text-slate-700">{submission.preferred_service}</td>
                    <td className="px-4 py-3 text-slate-700">{submission.budget_range}</td>
                    <td className="px-4 py-3 text-slate-700">{submission.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </div>
  );
}

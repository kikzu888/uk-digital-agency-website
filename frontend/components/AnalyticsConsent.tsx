"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "none";
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export function AnalyticsConsent() {
  const [consent, setConsent] = useState<"unknown" | "accepted" | "declined">("unknown");

  useEffect(() => {
    const savedConsent = window.localStorage.getItem("analytics-consent");
    if (savedConsent === "accepted" || savedConsent === "declined") {
      setConsent(savedConsent);
    }
  }, []);

  function saveConsent(value: "accepted" | "declined") {
    window.localStorage.setItem("analytics-consent", value);
    setConsent(value);
  }

  const analyticsEnabled = provider === "ga4" && gaMeasurementId && consent === "accepted";

  return (
    <>
      {analyticsEnabled ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-consented" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}
      {provider !== "none" && consent === "unknown" ? (
        <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-md border border-slate-200 bg-white p-4 shadow-2xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm leading-6 text-slate-700">
              We use optional analytics only with your consent to understand website performance.
            </p>
            <div className="flex gap-3">
              <button
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800"
                onClick={() => saveConsent("declined")}
                type="button"
              >
                Decline
              </button>
              <button
                className="rounded-md bg-emerald-900 px-4 py-2 text-sm font-semibold text-white"
                onClick={() => saveConsent("accepted")}
                type="button"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

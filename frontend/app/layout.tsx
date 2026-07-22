import type { Metadata } from "next";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "VenusCore";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${companyName} | Digital Growth, Automation and Security`,
    template: `%s | ${companyName}`,
  },
  description:
    "Digital marketing, web development, AI automation, CRM and cybersecurity services for UK businesses.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${companyName} | Digital Growth, Automation and Security`,
    description:
      "Digital marketing, web development, AI automation, CRM and cybersecurity services for UK businesses.",
    url: siteUrl,
    siteName: companyName,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${companyName} | Digital Growth, Automation and Security`,
    description:
      "Digital marketing, web development, AI automation, CRM and cybersecurity services for UK businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organisationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: companyName,
    url: siteUrl,
    areaServed: "United Kingdom",
    email: "Business Email",
    telephone: "UK Phone Number",
    address: "UK Business Address",
    serviceType: [
      "Digital Marketing",
      "Web Development",
      "AI Automation Processes",
      "CRM Solutions",
      "Cybersecurity Services",
    ],
  };

  return (
    <html lang="en-GB">
      <body>
        <JsonLd data={organisationSchema} />
        <SiteHeader />
        {children}
        <AnalyticsConsent />
        <SiteFooter />
      </body>
    </html>
  );
}

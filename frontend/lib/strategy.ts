/** Approved content outline. Wire to pages and API together in the next phase. */
export const enquiryJourneys = [
  {
    intent: "consultation",
    label: "Let’s talk",
    href: "/contact?intent=consultation",
    summary: "Talk through your goals and identify a practical next step.",
    requiredFields: ["name", "email", "goal", "privacyConsent"],
    optionalFields: ["company", "websiteUrl", "phone", "preferredTime"],
    confirmation: "Your consultation request has been received. We will contact you to arrange a suitable time.",
  },
  {
    intent: "project",
    label: "Start a project",
    href: "/contact?intent=project",
    summary: "Share what you need to build, improve or connect.",
    requiredFields: ["name", "email", "service", "goal", "privacyConsent"],
    optionalFields: ["company", "websiteUrl", "phone", "timeline", "budget"],
    confirmation: "Your project enquiry has been received. We will review your requirements and contact you to discuss the scope.",
  },
  {
    intent: "audit",
    label: "Review my business",
    href: "/contact?intent=audit",
    summary: "Get an initial review of your website, marketing or lead follow-up process.",
    requiredFields: ["name", "email", "auditArea", "goal", "privacyConsent"],
    optionalFields: ["company", "websiteUrl", "phone"],
    confirmation: "Your audit request has been received. We will contact you to confirm the scope and any information needed.",
  },
] as const;

export type EnquiryIntent = (typeof enquiryJourneys)[number]["intent"];

export const homepageOutline = {
  eyebrow: "VenusCore / Digital growth for UK businesses",
  title: "Your next phase of growth starts here.",
  summary: "Reach the right people. Give them a reason to choose you. We bring your marketing, website and sales workflows together — from the first click to the next conversation.",
  serviceGroups: [
    {
      title: "Attract the right enquiries",
      summary: "Campaign strategy, Meta and Google Ads, audience-focused creative and landing pages built around your business goals.",
      services: ["Paid Media & Lead Generation", "Creative & Campaign Content"],
    },
    {
      title: "Build a stronger web presence",
      summary: "Websites, landing pages and SEO that help visitors understand your offer and take the next step.",
      services: ["Websites & Landing Pages", "SEO"],
    },
    {
      title: "Keep leads moving",
      summary: "CRM workflows, WhatsApp and email marketing, and practical AI automation to connect your tools and support follow-up.",
      services: ["CRM & Sales Workflows", "WhatsApp & Email Marketing", "AI Process Automation"],
    },
  ],
  workHeading: "Experience behind the delivery",
  workSummary: "Explore projects delivered by our founder across real estate, construction, consulting, mobility and ecommerce. Each case explains the role, scope and available evidence.",
  featuredProjects: ["big-estate", "ioka-international", "canastruct", "laduchi"],
  allProjects: ["big-estate", "ioka-international", "eagle-hills", "canastruct", "canawelding", "laduchi", "kraft-rohbau", "kraftbouw", "gilani-mobility", "handy"],
  process: [
    ["Understand", "Clarify your goals, audiences and current tools."],
    ["Plan", "Agree priorities, deliverables and how progress will be assessed."],
    ["Deliver", "Build the agreed campaigns, website or workflows."],
    ["Review", "Check the results, document the work and identify improvements."],
  ],
  faqs: [
    ["Are consultations and audits free?", "Yes. The initial consultation and audit are free. We agree the audit scope before starting; implementation work is scoped separately."],
    ["Can you work with our existing website or CRM?", "Yes. We first review what is already in place and identify whether improvements or a new setup are appropriate."],
    ["Can we start with one service?", "Yes. You can begin with a campaign, landing page, SEO task or workflow improvement and expand when needed."],
    ["How do you price projects?", "We prepare an individual proposal after understanding the scope, requirements and delivery priorities."],
  ],
} as const;

export const launchReview = {
  provisionalLocation: "London",
  confirmContactsAndAddressBeforeLaunch: true,
  publicEmailConfirmed: false,
  displayServicePrices: false,
  confirmedBookingIntegration: false,
  auditScope: "Initial review and prioritised recommendations; no automatic account access or invasive testing.",
} as const;

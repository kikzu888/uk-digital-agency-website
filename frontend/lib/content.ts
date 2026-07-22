export const company = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "VenusCore",
  logo: "/brand/venuscore-logo.png",
  mark: "/brand/venuscore-mark.png",
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "UK Phone Number",
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? "Business Email",
  address: "UK Business Address",
  registrationNumber: "Company Registration Number",
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    summary:
      "Focused campaigns, search visibility and conversion improvements for UK companies that need measurable growth.",
    image: "/images/service-digital-marketing.png",
    imageAlt:
      "Marketing strategist reviewing abstract campaign analytics and conversion dashboards for a UK business",
    problems: [
      "Low-quality enquiries from paid or organic channels",
      "Unclear marketing attribution",
      "Website traffic that does not convert",
    ],
    benefits: [
      "Cleaner acquisition strategy",
      "Better qualified leads",
      "More confidence in marketing spend",
    ],
    process: ["Audit", "Strategy", "Campaign setup", "Optimisation", "Reporting"],
    faqs: [
      {
        question: "Can you work with an existing marketing team?",
        answer: "Yes. We can support internal teams with strategy, execution or technical delivery.",
      },
      {
        question: "Do you guarantee rankings?",
        answer: "No. We focus on sustainable improvements and transparent reporting, not false guarantees.",
      },
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    summary:
      "Fast, secure and SEO-ready websites built around clear business goals and practical content management.",
    image: "/images/service-web-development.png",
    imageAlt:
      "Responsive website layouts shown across desktop, tablet and mobile devices in a development workspace",
    problems: [
      "Slow or outdated websites",
      "Poor mobile experience",
      "Limited technical SEO foundations",
    ],
    benefits: [
      "Improved user experience",
      "Stronger technical foundations",
      "A platform that can grow with the business",
    ],
    process: ["Discovery", "UX planning", "Build", "Content integration", "Launch"],
    faqs: [
      {
        question: "Will the website be mobile friendly?",
        answer: "Yes. The frontend is planned mobile-first and tested across key responsive breakpoints.",
      },
      {
        question: "Can you maintain the website after launch?",
        answer: "Yes. Ongoing support can cover updates, monitoring, security and new features.",
      },
    ],
  },
  {
    slug: "ai-automation-processes",
    title: "AI Automation Processes",
    summary:
      "Practical automation for repetitive business workflows, using AI where it creates real operational value.",
    image: "/images/service-ai-automation.png",
    imageAlt:
      "Business automation workflow dashboard with connected approval steps and AI-assisted process cards",
    problems: [
      "Manual admin slowing down teams",
      "Repeated data entry across tools",
      "Inconsistent customer follow-up",
    ],
    benefits: [
      "Less repetitive work",
      "Faster response times",
      "More consistent internal processes",
    ],
    process: ["Workflow mapping", "Risk review", "Prototype", "Integration", "Monitoring"],
    faqs: [
      {
        question: "Do you automate everything with AI?",
        answer: "No. We use AI only where it is reliable, useful and appropriate for the workflow.",
      },
      {
        question: "Can automation connect with our current tools?",
        answer: "Usually, yes. We assess APIs, data access and security requirements before implementation.",
      },
    ],
  },
  {
    slug: "crm-solutions",
    title: "CRM Solutions",
    summary:
      "CRM setup, improvement and automation that helps teams manage leads, customers and follow-up clearly.",
    image: "/images/service-crm-solutions.png",
    imageAlt:
      "CRM pipeline dashboard and customer follow-up interface on a business laptop",
    problems: [
      "Leads lost in spreadsheets or inboxes",
      "No clear sales pipeline",
      "Poor customer data hygiene",
    ],
    benefits: [
      "Cleaner customer records",
      "More reliable follow-up",
      "Better sales and service visibility",
    ],
    process: ["Requirements", "Data model", "Configuration", "Migration", "Training"],
    faqs: [
      {
        question: "Can you improve an existing CRM?",
        answer: "Yes. We can audit and improve existing CRM systems before recommending replacement.",
      },
      {
        question: "Which CRM do you recommend?",
        answer: "It depends on the business size, process, budget and integration needs.",
      },
    ],
  },
  {
    slug: "cybersecurity-services",
    title: "Cybersecurity Services",
    summary:
      "Baseline security improvements for websites, cloud systems and business processes, designed for SMEs.",
    image: "/images/service-cybersecurity.png",
    imageAlt:
      "Cybersecurity monitoring dashboard showing abstract access control and risk indicators",
    problems: [
      "Weak website and account security",
      "Unclear data protection processes",
      "No practical security monitoring",
    ],
    benefits: [
      "Reduced operational risk",
      "Better client trust",
      "Clearer security responsibilities",
    ],
    process: ["Assessment", "Prioritisation", "Remediation", "Policy support", "Review"],
    faqs: [
      {
        question: "Do you provide penetration testing?",
        answer: "We can scope security testing needs and connect specialist testing where required.",
      },
      {
        question: "Can you help with security basics first?",
        answer: "Yes. We prioritise practical improvements such as access control, patching and secure setup.",
      },
    ],
  },
];

export const processSteps = [
  "Understand the business goal",
  "Audit the current systems",
  "Design a practical roadmap",
  "Build and integrate",
  "Measure, improve and support",
];

export const newsCategories = [
  "Digital Marketing",
  "Web Development",
  "Artificial Intelligence",
  "Business Automation",
  "CRM",
  "Cybersecurity",
  "UK Business Technology",
];

export const newsArticles = [
  {
    title: "How UK SMEs can plan a practical digital roadmap",
    slug: "uk-sme-digital-roadmap",
    excerpt:
      "A practical approach to prioritising website, marketing, CRM, automation and security work.",
    body: "This placeholder article outlines a staged roadmap for UK SMEs. It is demo content for structure, SEO metadata and editorial workflow validation.",
    author: "VenusCore Editorial",
    publishedAt: "2026-07-01",
    updatedAt: "2026-07-15",
    category: "Digital Marketing",
    featuredImage: "/images/news-digital-roadmap.png",
    featuredImageAlt:
      "Digital roadmap planning workspace with abstract milestones for websites, CRM, automation and security",
    status: "published",
  },
  {
    title: "What to check before rebuilding a business website",
    slug: "business-website-rebuild-checklist",
    excerpt: "Key planning areas before investing in a new website build.",
    body: "This placeholder article covers goals, content, analytics, redirects, accessibility, performance and maintainability.",
    author: "VenusCore Editorial",
    publishedAt: "2026-07-05",
    updatedAt: "2026-07-15",
    category: "Web Development",
    featuredImage: "/images/news-website-rebuild.png",
    featuredImageAlt:
      "Website rebuild planning workspace with abstract wireframes, accessibility checks and SEO structure",
    status: "published",
  },
  {
    title: "Where AI automation makes sense for service businesses",
    slug: "ai-automation-service-businesses",
    excerpt: "A responsible way to decide which workflows should be automated.",
    body: "This placeholder article explains how to assess repeatability, risk, data access and human review before adding AI automation.",
    author: "VenusCore Editorial",
    publishedAt: "2026-07-08",
    updatedAt: "2026-07-15",
    category: "Artificial Intelligence",
    featuredImage: "/images/service-ai-automation.png",
    featuredImageAlt:
      "AI automation workflow dashboard with connected process steps for a service business",
    status: "published",
  },
];

export const portfolioProjects = [
  {
    title: "Placeholder CRM and website workflow",
    slug: "placeholder-crm-website-workflow",
    shortDescription: "Demo case study format for a joined-up website and CRM workflow.",
    clientSector: "Placeholder sector",
    businessProblem: "Placeholder business problem showing where real client context will appear.",
    solution: "Placeholder solution describing the proposed technical and operational approach.",
    technologies: ["Next.js", "FastAPI", "PostgreSQL", "CRM integration"],
    results: ["Placeholder result format only", "No real client statistics claimed"],
    images: ["/images/portfolio-crm-workflow.png"],
    imageAlt:
      "Placeholder case study visual showing a website enquiry flow connected to a generic CRM pipeline",
    category: "Web Development",
    isPlaceholder: true,
  },
  {
    title: "Placeholder automation discovery project",
    slug: "placeholder-automation-discovery-project",
    shortDescription: "Demo case study format for workflow mapping and automation planning.",
    clientSector: "Placeholder sector",
    businessProblem: "Placeholder manual workflow challenge.",
    solution: "Placeholder automation roadmap and governance approach.",
    technologies: ["AI workflow tools", "API integration", "Secure process design"],
    results: ["Placeholder outcome only", "Requires replacement with verified client-approved results"],
    images: ["/images/portfolio-automation-discovery.png"],
    imageAlt:
      "Placeholder automation discovery visual showing generic workflow mapping and integration planning",
    category: "AI Automation",
    isPlaceholder: true,
  },
];

export type Role = {
  company: string;
  title: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experience: Role[] = [
  {
    company: "Dotmatics, a Siemens Company",
    title: "RVP, North America Services",
    location: "Boston, MA",
    period: "Oct 2023 — Present",
    bullets: [
      "Drove utilisation above 50% and executed a full department restructure within the first 3 months.",
      "Accountable for the $10M 'Lab of the Future' program with Vertex — the largest program in Dotmatics history.",
      "Sponsored delivery to key clients including AbbVie, Takeda, GSK, and Regeneron.",
      "Delivered the newest biologics solution to Johnson & Johnson, migrating 25 years of customer data.",
      "Pivoted the organisation from product/market-share focus to revenue and margin (FY23: -3%, FY24: 24%, FY25: 1%).",
    ],
  },
  {
    company: "Dotmatics, a Siemens Company",
    title: "RVP, EMEA Services",
    location: "Bishops Stortford, UK",
    period: "Aug 2022 — Sep 2024",
    bullets: [
      "Led 35 people across Europe and offshore partners, delivering roughly 100 concurrent projects for clients including BASF, Altana, Johnson Matthey, and Clariant.",
      "Restructured and recruited to build a streamlined operations function.",
      "Managed and strengthened relationships with key strategic accounts.",
    ],
  },
  {
    company: "Dotmatics, a Siemens Company",
    title: "Head of Technology Operations",
    location: "Bishops Stortford, UK",
    period: "May 2021 — Jul 2022",
    bullets: [
      "Designed and drove a transformation of process and tooling across 140 people in Product and Technology.",
      "Rebaselined and delivered a complex strategic customer project, rebuilding trust throughout.",
    ],
  },
  {
    company: "Commify Limited",
    title: "Engineering Project Manager / Data Team Lead",
    location: "Nottingham, UK",
    period: "Jul 2018 — Apr 2021",
    bullets: [
      "Established the company's new Data Team to drive sales pipeline analysis and platform consolidation.",
      "Led engineering delivery of NetSuite, Salesforce, and HubSpot integrations across 7 commercial platforms.",
      "Delivered a technical migration of over 6,000 customers with under 1 minute of downtime per customer.",
    ],
  },
  {
    company: "Travtus Limited",
    title: "Product Development Manager",
    location: "London, UK",
    period: "Sep 2017 — Apr 2018",
    bullets: [
      "Scrum Master for legacy products across iOS, Android, web, and backend admin platforms.",
      "Re-platformed and expanded capability with a nearshore delivery partner in Romania.",
    ],
  },
  {
    company: "Luxe Surveyor Limited",
    title: "Head of Digital Products",
    location: "Hong Kong",
    period: "Jan 2017 — Jun 2017",
    bullets: [
      "Recruited and built the engineering team for a multi-platform consumer product and business data platform.",
      "Established delivery processes and supported the founder on strategic funding.",
    ],
  },
  {
    company: "Tapptic Germany GmbH",
    title: "Technical Project Manager",
    location: "Berlin, Germany",
    period: "Feb 2016 — Dec 2016",
    bullets: [
      "Country lead defining process and tooling for digital consultancy tender and bid submissions.",
      "Coordinated agile delivery and resourcing across 6 countries.",
    ],
  },
  {
    company: "Glow Convention",
    title: "IT Project Manager",
    location: "Berlin, Germany",
    period: "Sep 2015 — Jan 2016",
    bullets: [
      "Converted design concepts into requirements for a web content and e-commerce platform.",
      "Exceeded all delivery metrics and hit sales targets ahead of schedule.",
    ],
  },
  {
    company: "newscase GmbH",
    title: "Quality Assurance Manager",
    location: "Berlin, Germany",
    period: "Jul 2013 — Jul 2015",
    bullets: [
      "Supported three products across a distributed team split between Goa, Berlin, and New York.",
      "Owned the product roadmap, Scrum process, and release planning.",
    ],
  },
  {
    company: "Experian Limited",
    title: "UK&I IT Programme Management Office Manager",
    location: "Nottingham, UK",
    period: "Jan 2010 — Jan 2013",
    bullets: [
      "Managed up to 14 people, coordinating strategic technical delivery across client and product portfolios.",
      "Piloted Scrum within a traditional waterfall department across an 18-month rollout.",
      "Acted as proxy to the Global PMO, influencing key strategic business change projects.",
    ],
  },
];

export const education = [
  {
    qualification: "BSc (Hons) Financial and Project Management in Construction",
    institution: "Nottingham Trent University",
    period: "2002 — 2007",
  },
  {
    qualification: "German Language Course (C1)",
    institution: "Berlin, Germany",
    period: "2013 — 2016",
  },
  {
    qualification: "A-Levels: Accounting, Business Studies, Computing",
    institution: "Richard Huish College, Taunton",
    period: "2000 — 2002",
  },
];

export const skills = [
  "Wide knowledge of Agile methodologies (Scrum, DevOps, Kanban, Continuous Integration) with hands-on team coaching.",
  "Coaching, triaging, and developing teams across varied communication and delivery styles, including near- and offshore.",
  "Extensive use of PPM tooling — Jira, Redmine, Primavera, MS Project — including custom Exec and Financial reporting builds.",
  "Cross-team delivery leadership spanning Sales, Product, Marketing, Business Development, HR, and Finance.",
  "Process analysis to automate, organise, and optimise operations and strategy.",
  "PRINCE2 Practitioner with enhanced knowledge of PMI and Agile (Scrum, XP, TDD, CD).",
];

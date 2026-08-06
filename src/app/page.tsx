import Link from "next/link";
import Portrait from "@/components/Portrait";
import { skills } from "@/lib/experience";

const stats = [
  { value: "18", label: "Years in IT & technology delivery" },
  { value: "14", label: "Years in leadership roles" },
  { value: "$10M+", label: "Largest program delivered" },
  { value: "PRINCE2", label: "Practitioner, Agile & PMI" },
];

const tags = [
  "Agile & DevOps",
  "Program Leadership",
  "Enterprise Delivery",
  "Data & Reporting",
  "Team Coaching",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-5xl px-6 py-8 sm:py-14 lg:py-16">
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
            {/* Main content */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                Michael Moss
              </h1>
              <p className="mx-auto mt-2 sm:mt-4 max-w-2xl text-lg leading-relaxed text-white/85 lg:mx-0">
                A determined, detail-driven technology leader with 18 years&rsquo;
                experience — 14 in leadership — driving customer-centric delivery
                through robust process and governance, with data and customers at the
                centre of every decision.
              </p>

              {/* Buttons */}
              <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 sm:items-center sm:justify-center lg:justify-start">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-teal px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-cream"
                >
                  Get in Touch
                </Link>
                <a
                  href="https://www.linkedin.com/in/michael-moss-26a86a8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal hover:text-navy"
                  title="Connect on LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 9.67H5.67V18.3h2.67V9.67zM7 5.9a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM18.34 18.3v-4.73c0-2.53-1.35-3.71-3.15-3.71a2.72 2.72 0 0 0-2.46 1.35h-.04V9.67H10.1v8.63h2.67v-4.27c0-1.12.21-2.2 1.6-2.2s1.4 1.28 1.4 2.27v4.2h2.57z" />
                  </svg>
                  Connect
                </a>
              </div>
            </div>

            {/* Portrait */}
            <div className="hidden lg:block">
              <Portrait className="h-48 w-48" />
            </div>
          </div>

          {/* Learn more button with scroll cue */}
          <div className="mt-8 sm:mt-12 flex justify-center lg:mt-16">
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-cream scroll-cue"
            >
              Learn more
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </a>
          </div>

          {/* Bottom padding for scroll space */}
          <div className="h-6" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-navy sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-navy/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-5xl px-6 py-14">
        <div className="section-divider mb-5" />
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">
          Operational excellence, built on people
        </h2>
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          <p className="leading-relaxed text-navy/80">
            I&rsquo;m a passionate Agile evangelist and a proven enabler within
            delivery teams. I pride myself on attentive action and passion — for the
            products I engage with and the people around the organizations I work
            with. My operational, tactical, and strategic skills are strong, and I
            step up to lead problems, dependencies, and conflicts through diligent,
            proactive management, building a transparent team ethos that drives work
            through to resolution.
          </p>
          <p className="leading-relaxed text-navy/80">
            Beyond coaching and developing people, my focus is using technology to
            build long-lasting, scalable solutions that deliver real performance
            against cost. That passion for IT isn&rsquo;t limited to my professional
            sphere — I love helping others realise their own aspirations, whether
            that&rsquo;s a personal website or the best way to automate a process in
            their working life.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-rose/30 px-4 py-2 text-sm font-medium text-navy"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="bg-cream">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="section-divider mb-5" />
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">What I bring</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-xl bg-white p-5 text-sm leading-relaxed text-navy/80 shadow-sm"
              >
                {skill}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-navy/80">
            Want the full picture?{" "}
            <Link
              href="/about"
              className="font-semibold text-teal underline decoration-teal/40 underline-offset-4 hover:text-navy"
            >
              See my experience, education, and background &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-5xl px-6 py-14 text-center">
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">
          Let&rsquo;s connect
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-navy/80">
          Whether it&rsquo;s a project, a partnership, or just to connect — I&rsquo;d
          love to hear from you.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-teal px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            Get in Touch
          </Link>
          <a
            href="https://www.linkedin.com/in/michael-moss-26a86a8/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-navy/30 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
          >
            Connect on LinkedIn
          </a>
        </div>
      </section>
    </>
  );
}

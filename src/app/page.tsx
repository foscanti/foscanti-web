import Link from "next/link";

const stats = [
  { value: "18", label: "Years in IT & technology delivery" },
  { value: "14", label: "Years in leadership roles" },
  { value: "$10M+", label: "Program value delivered" },
  { value: "PRINCE2", label: "Practitioner, Agile & PMI" },
];

export default function Home() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-24 sm:py-32">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal">
            RVP, North America Services — Dotmatics, a Siemens Company
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Michael George Moss
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/85">
            A professional, determined, and detail-driven technology leader with 18
            years&rsquo; experience — 14 in leadership — delivering complex, multi-team
            programs to enterprise and product organizations, and communicating
            extensively with C-suite and senior leaders.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/about"
              className="rounded-full bg-teal px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-cream"
            >
              About Me
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-teal hover:text-teal"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-14 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-navy sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm text-navy/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="section-divider mb-6" />
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">
          Operational excellence, built on people
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-navy/80">
          I pride myself on attentive action and passion — for the products I engage
          with and the people around the organizations I work with. My operational,
          tactical, and strategic skills are strong, and I step up to lead problems,
          dependencies, and conflicts through diligent, proactive management, building
          a transparent team ethos that drives tasks through to resolution.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-navy/80">
          I&rsquo;m passionate about process refinement and operational excellence —
          driving new technology, product development, and design in web and app
          products that create real value.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {["Agile & DevOps", "Program Leadership", "Enterprise Delivery", "Data & Reporting", "Team Coaching"].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-full bg-rose/30 px-4 py-2 text-sm font-medium text-navy"
              >
                {tag}
              </span>
            ),
          )}
        </div>
      </section>
    </>
  );
}

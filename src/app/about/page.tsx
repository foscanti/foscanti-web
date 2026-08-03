import type { Metadata } from "next";
import Portrait from "@/components/Portrait";
import { education, experience, skills } from "@/lib/experience";

export const metadata: Metadata = {
  title: "About | Michael Moss",
  description: "Profile, skills, experience, and education for Michael George Moss.",
};

export default function About() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-14 sm:py-16 sm:flex-row sm:items-center">
          <div className="shrink-0 overflow-hidden rounded-2xl ring-4 ring-teal/60 shadow-xl">
            <Portrait className="h-40 w-40 object-cover sm:h-48 sm:w-48" />
          </div>
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">About Me</h1>
            <p className="mt-2 text-white/80">
              Nottingham → Berlin → Hong Kong → Boston: 18 years of technology and
              program leadership across product, enterprise, and consulting
              organizations.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="section-divider mb-6" />
        <h2 className="text-2xl font-bold text-navy">Profile</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-navy/80">
          <p>
            I am a professional, determined, and detail-driven IT professional with
            18 years&rsquo; experience, 14 years in leadership roles, and 12 years
            delivering complex multi-team projects and programs to both product-market
            and enterprise clients, communicating extensively with C-suite and senior
            leaders.
          </p>
          <p>
            I pride myself on attentive action and passion, whether that&rsquo;s for
            the products I engage in or the people around the organizations I work
            with. My operational, tactical, and strategic skills are strong, and I
            step up and lead problems, dependencies, and conflicts through diligent
            and proactive management and coaching of all stakeholders — building a
            strong, clear, and transparent team ethos in driving tasks to resolution
            and managing the change impacts along the way.
          </p>
          <p>
            I am passionate about process refinement and operational excellence,
            driving new technology and product development and design in web and app
            development — creating, improving, and implementing changes that add value
            to products, processes, and technologies.
          </p>
          <p>
            At heart I&rsquo;m an Agile evangelist and an enabler within delivery
            teams: my main interest is using technology to build long-lasting,
            scalable solutions that deliver performance against cost. That passion
            isn&rsquo;t limited to my professional sphere — I actively help others
            realise their own aspirations, whether that&rsquo;s a personal website or
            the best way to automate a process in their working life.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="section-divider mb-6" />
          <h2 className="text-2xl font-bold text-navy">Skills Summary</h2>
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
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="section-divider mb-6" />
        <h2 className="text-2xl font-bold text-navy">Experience</h2>
        <ol className="mt-8 space-y-10 border-l-2 border-rose/50 pl-8">
          {experience.map((role) => (
            <li key={`${role.company}-${role.title}-${role.period}`} className="relative">
              <span className="absolute -left-[2.55rem] top-1 h-3 w-3 rounded-full bg-teal" />
              <p className="text-xs font-semibold uppercase tracking-wide text-teal">
                {role.period}
              </p>
              <h3 className="mt-1 text-lg font-bold text-navy">{role.title}</h3>
              <p className="text-sm font-medium text-navy/70">
                {role.company} — {role.location}
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-navy/80">
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="section-divider mb-6" />
          <h2 className="text-2xl font-bold text-navy">Education</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {education.map((item) => (
              <div key={item.qualification} className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal">
                  {item.period}
                </p>
                <p className="mt-2 font-semibold text-navy">{item.qualification}</p>
                <p className="mt-1 text-sm text-navy/70">{item.institution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="section-divider mb-6" />
        <h2 className="text-2xl font-bold text-navy">Outside of Work</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-navy/80">
          <p>
            Technology and sport define my life outside work. I love tweaking hardware
            and software, and I&rsquo;m always first in line for new tech and new game
            releases.
          </p>
          <p>
            Football is my deepest passion. I&rsquo;ve played, coached, and captained
            teams since childhood, and followed the game around the world, discovering
            new cultures along the way. That passion led me to co-found{" "}
            <a
              href="https://www.the92.net"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal underline decoration-teal/40 underline-offset-4 hover:text-navy"
            >
              the92.net
            </a>
            , a football website with a lively UK-wide community.
          </p>
          <p>
            I&rsquo;m also a keen runner — I recently ran the London and Berlin
            marathons 8 days apart, raising £4,500 for charity.
          </p>
        </div>
      </section>
    </>
  );
}

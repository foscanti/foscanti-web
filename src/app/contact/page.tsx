import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Michael Moss",
  description: "Get in touch with Michael George Moss.",
};

const details = [
  { label: "Email", value: "michael@foscanti.com", href: "mailto:michael@foscanti.com" },
  {
    label: "LinkedIn",
    value: "in/michael-moss-26a86a8",
    href: "https://www.linkedin.com/in/michael-moss-26a86a8/",
  },
  { label: "Location", value: "Boston, MA, USA" },
  {
    label: "Languages",
    value: "English (Native), German (Professional working proficiency)",
  },
];

export default function Contact() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <h1 className="text-3xl font-bold sm:text-4xl">Get in Touch</h1>
          <p className="mt-2 max-w-2xl text-white/80">
            Whether it&rsquo;s a project, a partnership, or just to connect — I&rsquo;d
            love to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <div className="section-divider mb-6" />
            <h2 className="text-2xl font-bold text-navy">Contact Details</h2>
            <dl className="mt-6 space-y-5">
              {details.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-teal">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-lg text-navy">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="hover:text-teal"
                        {...(item.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href="mailto:michael@foscanti.com"
              className="mt-8 inline-block rounded-full bg-teal px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-cream"
            >
              Send an Email
            </a>
          </div>

          <div className="rounded-2xl bg-rose/20 p-8">
            <h2 className="text-lg font-bold text-navy">A note on reaching out</h2>
            <p className="mt-4 text-sm leading-relaxed text-navy/80">
              Email is the fastest way to reach me. I try to respond to every message
              — please include a little detail about what you&rsquo;d like to discuss
              so I can get back to you with something useful.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-navy/80">
              Based in the Boston area and always happy to connect with fellow
              technology, product, and delivery leaders.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

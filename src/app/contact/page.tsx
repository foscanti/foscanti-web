import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Michael Moss",
  description: "Get in touch with Michael Moss.",
};

const details = [
  { label: "Cell (US)", value: "🇺🇸 339-242-7199", href: "tel:+13392427199" },
  { label: "Cell (UK)", value: "🇬🇧 07835 961 284", href: "tel:+447835961284" },
  { label: "Email", value: "michael@foscanti.com", href: "mailto:michael@foscanti.com" },
  {
    label: "LinkedIn",
    value: "Connect on LinkedIn",
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
        <div className="mx-auto max-w-5xl px-6 py-8">
          <h1 className="text-2xl font-bold">Get in Touch</h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="section-divider mb-6" />
        <div className="mb-8 rounded-2xl bg-rose/20 p-6">
          <p className="text-sm leading-relaxed text-navy/80">
            Email is slow — from a bygone era, lost in marketing malaise and the
            ramifications of reminders. Message or call my cell; leave a voicemail
            and I&rsquo;ll get back to you quickly.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-navy/80">
            Based in the Boston area and always happy to connect with fellow
            technology, product, and delivery leaders.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-navy">Send a Message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div>
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

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="tel:+13392427199"
                className="inline-block rounded-full bg-teal px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-cream"
              >
                Call my cell
              </a>
              <a
                href="mailto:michael@foscanti.com"
                className="inline-block rounded-full border border-navy/30 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
              >
                Send an email
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

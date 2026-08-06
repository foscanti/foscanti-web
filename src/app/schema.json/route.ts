export async function GET() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Michael Moss",
    url: "https://foscanti.com",
    email: "michael@foscanti.com",
    jobTitle: "RVP, North America Services",
    worksFor: {
      "@type": "Organization",
      name: "Dotmatics, a Siemens Company",
    },
    sameAs: ["https://www.linkedin.com/in/michael-moss-26a86a8/"],
    description:
      "Technology and operations executive with 18 years' experience leading complex, multi-team programs for enterprise and product organizations.",
    telephone: "+1-339-242-7199",
    areaServed: "US",
    knowsLanguage: ["en-US", "de"],
  };

  return new Response(JSON.stringify(schema), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

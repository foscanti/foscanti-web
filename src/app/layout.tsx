import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Michael Moss | Technology & Operations Executive",
  description:
    "Technology and operations executive with 18 years' experience leading complex, multi-team programs for enterprise and product organizations.",
  openGraph: {
    title: "Michael Moss | Technology & Operations Executive",
    description:
      "Technology and operations executive with 18 years' experience leading complex, multi-team programs for enterprise and product organizations.",
    url: "https://foscanti.com",
    siteName: "Michael Moss",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Moss | Technology & Operations Executive",
    description:
      "Technology and operations executive with 18 years' experience leading complex, multi-team programs for enterprise and product organizations.",
  },
  robots: "index, follow",
  authors: [{ name: "Michael Moss" }],
  other: {
    "application/ld+json": JSON.stringify({
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
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-navy">
        <NavBar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

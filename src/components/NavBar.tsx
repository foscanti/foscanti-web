"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Get in Touch" },
];

const LINKEDIN_URL = "https://www.linkedin.com/in/michael-moss-26a86a8/";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 9.67H5.67V18.3h2.67V9.67zM7 5.9a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM18.34 18.3v-4.73c0-2.53-1.35-3.71-3.15-3.71a2.72 2.72 0 0 0-2.46 1.35h-.04V9.67H10.1v8.63h2.67v-4.27c0-1.12.21-2.2 1.6-2.2s1.4 1.28 1.4 2.27v4.2h2.57z" />
    </svg>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy text-white shadow-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Michael Moss
        </Link>

        <button
          type="button"
          className="flex flex-col gap-1.5 sm:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
        </button>

        <ul className="hidden items-center gap-8 sm:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-teal ${
                    active ? "text-teal" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
              title="Connect on LinkedIn"
              className="text-white transition-colors hover:text-teal"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </li>
        </ul>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-white/10 px-6 pb-4 sm:hidden">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-2 text-sm font-medium transition-colors hover:text-teal ${
                    active ? "text-teal" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              aria-label="Connect on LinkedIn"
              title="Connect on LinkedIn"
              className="mt-2 inline-flex text-white transition-colors hover:text-teal"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}

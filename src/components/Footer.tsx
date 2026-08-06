export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-8 text-center text-sm sm:flex-row sm:justify-between sm:text-left">
        <p>&copy; {year} Michael Moss. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="mailto:michael@foscanti.com" className="hover:text-teal">
            michael@foscanti.com
          </a>
          <a
            href="https://www.linkedin.com/in/michael-moss-26a86a8/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

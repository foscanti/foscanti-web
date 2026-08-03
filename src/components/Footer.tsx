export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-8 text-center text-sm sm:flex-row sm:justify-between sm:text-left">
        <p>&copy; {year} Michael George Moss. All rights reserved.</p>
        <p>
          <a href="mailto:michael@foscanti.com" className="hover:text-teal">
            michael@foscanti.com
          </a>
        </p>
      </div>
    </footer>
  );
}

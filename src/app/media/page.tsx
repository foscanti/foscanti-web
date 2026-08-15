import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "In the Media | Michael Moss",
  description: "Media appearances, articles, and podcast features.",
};

export default function Media() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <h1 className="text-2xl font-bold">In the Media</h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Articles */}
          <div>
            <div className="section-divider mb-6" />
            <h2 className="text-2xl font-bold text-navy mb-6">Articles</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://nypost.com/2023/07/09/farmer-nearly-crushed-by-half-a-ton-of-hay-is-saved-by-father-of-two/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-teal transition-colors"
                >
                  <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span>New York Post: Farmer Rescued from Hay</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.mirror.co.uk/news/uk-news/dad-saves-farmers-life-three-30425771"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-teal transition-colors"
                >
                  <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span>Mirror: Dad Saves Farmer&rsquo;s Life</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Podcasts */}
          <div>
            <div className="section-divider mb-6" />
            <h2 className="text-2xl font-bold text-navy mb-6">Podcasts</h2>
            <div className="space-y-6">
              <div className="rounded-lg border border-navy/10 overflow-hidden">
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal mb-3">
                    Spotify
                  </p>
                  <iframe
                    src="https://open.spotify.com/embed/episode/7cyJgkFxEtA2ZCuUmfe04A?utm_source=generator"
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded"
                  />
                </div>
              </div>

              <a
                href="https://podcasts.apple.com/us/podcast/episode-7-meet-michael-moss-from-civil-engineering/id1594831082?i=1000548248333"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-navy/10 hover:border-teal transition-colors"
              >
                <svg
                  className="h-6 w-6 text-navy/60 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.5 6c-1.2 0-2.34.29-3.33.8-.73-2.77-3.21-4.8-6.17-4.8-3.56 0-6.5 2.94-6.5 6.5 0 .36.03.72.08 1.07C2.68 9.83 1 11.96 1 14.5 1 17.59 3.41 20 6.5 20h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.95.16-.75.25-1.52.25-2.31 0-3.56-2.94-6.5-6.6-6.74z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-navy hover:text-teal">
                    Episode 7: Meet Michael Moss
                  </p>
                  <p className="text-xs text-navy/60">
                    Open in Apple Podcasts
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

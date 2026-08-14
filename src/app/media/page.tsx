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
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Articles */}
          <div className="space-y-6">
            <div className="section-divider mb-6" />
            <h2 className="text-2xl font-bold text-navy">Articles</h2>
            <a
              href="https://nypost.com/2023/07/09/farmer-nearly-crushed-by-half-a-ton-of-hay-is-saved-by-father-of-two/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col overflow-hidden rounded-lg border border-navy/10 transition-shadow hover:shadow-lg"
            >
              <div className="bg-navy/5 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/60">
                    New York Post
                  </p>
                </div>
              </div>
              <div className="flex-1 p-4">
                <h3 className="font-semibold text-navy hover:text-teal">
                  Farmer Nearly Crushed by Half a Ton of Hay is Saved by Father of Two
                </h3>
                <p className="mt-2 text-xs text-navy/60">
                  A remarkable story of heroic action and quick thinking
                </p>
              </div>
            </a>

            <a
              href="https://www.mirror.co.uk/news/uk-news/dad-saves-farmers-life-three-30425771"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col overflow-hidden rounded-lg border border-navy/10 transition-shadow hover:shadow-lg"
            >
              <div className="bg-navy/5 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/60">
                    Mirror
                  </p>
                </div>
              </div>
              <div className="flex-1 p-4">
                <h3 className="font-semibold text-navy hover:text-teal">
                  Dad Saves Farmer&rsquo;s Life
                </h3>
                <p className="mt-2 text-xs text-navy/60">
                  A dramatic rescue that made headlines
                </p>
              </div>
            </a>
          </div>

          {/* Podcasts */}
          <div className="space-y-6">
            <div className="section-divider mb-6" />
            <h2 className="text-2xl font-bold text-navy">Podcasts</h2>
            <div className="flex flex-col overflow-hidden rounded-lg border border-navy/10">
              <div className="flex-1 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal mb-4">
                  Spotify
                </p>
                <iframe
                  src="https://open.spotify.com/embed/episode/7cyJgkFxEtA2ZCuUmfe04A?utm_source=generator"
                  width="100%"
                  height="232"
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
              className="flex flex-col overflow-hidden rounded-lg border border-navy/10 transition-shadow hover:shadow-lg"
            >
              <div className="bg-navy/5 p-6 flex flex-col items-center justify-center min-h-40">
                <svg
                  className="h-12 w-12 text-navy/60 mb-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.5 6c-1.2 0-2.34.29-3.33.8-.73-2.77-3.21-4.8-6.17-4.8-3.56 0-6.5 2.94-6.5 6.5 0 .36.03.72.08 1.07C2.68 9.83 1 11.96 1 14.5 1 17.59 3.41 20 6.5 20h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.95.16-.75.25-1.52.25-2.31 0-3.56-2.94-6.5-6.6-6.74z" />
                </svg>
                <p className="text-xs font-semibold uppercase tracking-wide text-navy/60 text-center">
                  Episode 7: Meet Michael Moss from Civil Engineering
                </p>
              </div>
              <div className="flex-1 p-4">
                <h3 className="font-semibold text-navy hover:text-teal">
                  Listen on Apple Podcasts
                </h3>
                <p className="mt-2 text-xs text-navy/60">
                  Open in Apple Podcasts app
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

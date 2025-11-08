import type { Metadata } from "next";
import "./globals.css";
import metadata from "@/data/metadata.json";

export const meta: Metadata = {
  title: `${metadata.profile.name} - Dev Notes`,
  description: "Developer notes in the style of John Carmack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased scanline">
        <div className="min-h-screen p-4 md:p-8">
          <header className="terminal max-w-4xl mx-auto p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              {metadata.profile.avatar && (
                <img
                  src={metadata.profile.avatar}
                  alt={metadata.profile.name}
                  className="w-16 h-16 border-2 border-green-500"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold glow mb-2">
                  {metadata.profile.name}
                </h1>
                <p className="text-green-400">{'>'} DEV NOTES SYSTEM v1.0</p>
              </div>
            </div>

            {metadata.profile.contact && (
              <div className="flex flex-wrap gap-4 text-sm border-t border-green-800 pt-4">
                {metadata.profile.contact.github && (
                  <a
                    href={`https://github.com/${metadata.profile.contact.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    [GitHub]
                  </a>
                )}
                {metadata.profile.contact.linkedin && (
                  <a
                    href={metadata.profile.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    [LinkedIn]
                  </a>
                )}
                {metadata.profile.contact.twitter && (
                  <a
                    href={`https://twitter.com/${metadata.profile.contact.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    [Twitter]
                  </a>
                )}
                {metadata.profile.contact.website && (
                  <a
                    href={metadata.profile.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    [Website]
                  </a>
                )}
              </div>
            )}
          </header>

          <main className="max-w-4xl mx-auto">
            {children}
          </main>

          <footer className="terminal max-w-4xl mx-auto p-6 mt-8 text-center text-sm text-green-700">
            <p>
              {'>'} Inspired by John Carmack&apos;s .plan files
            </p>
            <p className="mt-2">
              [<a href="/api/metadata.json" className="hover:text-green-400">metadata.json</a>]
              {' | '}
              [<a href="/api/notes.json" className="hover:text-green-400">notes.json</a>]
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import profileData from "@/data/metadata.json";

export const metadata: Metadata = {
  title: `${profileData.profile.name} - Dev Notes`,
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
              {profileData.profile.avatar && (
                <img
                  src={profileData.profile.avatar}
                  alt={profileData.profile.name}
                  className="w-16 h-16 border-2 border-green-500"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold glow mb-2">
                  {profileData.profile.name}
                </h1>
                <p className="text-green-400">{'>'} DEV NOTES SYSTEM v1.0</p>
              </div>
            </div>

            {profileData.profile.contact && (
              <div className="flex flex-wrap gap-4 text-sm border-t border-green-800 pt-4">
                {profileData.profile.contact.github && (
                  <a
                    href={`https://github.com/${profileData.profile.contact.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    [GitHub]
                  </a>
                )}
                {profileData.profile.contact.linkedin && (
                  <a
                    href={profileData.profile.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    [LinkedIn]
                  </a>
                )}
                {profileData.profile.contact.twitter && (
                  <a
                    href={`https://twitter.com/${profileData.profile.contact.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    [Twitter]
                  </a>
                )}
                {profileData.profile.contact.website && (
                  <a
                    href={profileData.profile.contact.website}
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

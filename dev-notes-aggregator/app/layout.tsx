import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev Notes Aggregator - Community Timeline",
  description: "Aggregated developer notes from the community",
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
          <header className="terminal max-w-6xl mx-auto p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold glow mb-2">
                  DEV NOTES AGGREGATOR
                </h1>
                <p className="text-green-400">
                  {'>'} Community developer notes timeline
                </p>
              </div>
              <div className="text-right text-sm">
                <p className="text-green-700">Inspired by John Carmack</p>
                <p className="text-green-700">Decentralized & Open</p>
              </div>
            </div>
          </header>

          <main className="max-w-6xl mx-auto">
            {children}
          </main>

          <footer className="terminal max-w-6xl mx-auto p-6 mt-8 text-center text-sm text-green-700">
            <p>
              {'>'} Aggregating dev notes from multiple sources
            </p>
            <p className="mt-2">
              Each developer maintains their own blog • No central authority • Pure decentralization
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}

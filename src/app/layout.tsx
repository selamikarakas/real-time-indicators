import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeToggle } from '@/components/ThemeToggle'
import { fontVariables } from '@/config/fonts'
import { siteMetadata } from '@/config/metadata'

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        <ThemeProvider>
          <header className="container mx-auto py-4 px-4 flex justify-between items-center">
            <div className="text-2xl font-bold">Crypto Dashboard</div>
            <ThemeToggle />
          </header>
          {children}
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ViewportHeightHandler } from "@/components/ViewportHeightHandler";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { TutorialProvider } from "@/contexts/TutorialContext";
import { ProviderProvider } from "@/contexts/ProviderContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aesthetics AI - Concierge Demo",
  description:
    "Experience the future of personalized patient journeys with AI-powered analysis and concierge-level care",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <TutorialProvider>
            <ProviderProvider>
              <ViewportHeightHandler />
              {children}
            </ProviderProvider>
          </TutorialProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

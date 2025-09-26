import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ViewportHeightHandler } from "@/components/ViewportHeightHandler";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { TutorialProvider } from "@/contexts/TutorialContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aesthetics AI - Concierge Demo",
  description:
    "Experience the future of personalized patient journeys with AI-powered analysis and concierge-level care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <TutorialProvider>
            <ViewportHeightHandler />
            {children}
          </TutorialProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

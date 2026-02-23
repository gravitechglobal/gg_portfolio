import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gravitech Global | Enterprise EduTech & IT Solutions",
  description:
    "Gravitech Global delivers world-class technology education, managed IT services, and professional certifications. Empowering enterprises with cutting-edge solutions across the globe.",
  keywords: [
    "EduTech",
    "IT Services",
    "Certifications",
    "Cloud",
    "AI",
    "DevOps",
    "Enterprise Solutions",
  ],
  openGraph: {
    title: "Gravitech Global | Enterprise EduTech & IT Solutions",
    description:
      "World-class technology education, managed IT services, and professional certifications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <div className="organic-bg" aria-hidden="true" />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}

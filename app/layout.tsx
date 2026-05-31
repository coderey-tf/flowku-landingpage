import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Flowku — Kelola Keuangan Bersama Pasangan",
  description:
    "Flowku membantu pasangan dan individu mencatat keuangan, membuat anggaran, dan mencapai goals finansial bersama. Coba gratis 30 hari, tanpa kartu kredit.",
  metadataBase: new URL("https://flowku.my.id"),
  openGraph: {
    title: "Flowku — Kelola Keuangan Bersama Pasangan",
    description:
      "Flowku membantu pasangan dan individu mencatat keuangan, membuat anggaran, dan mencapai goals finansial bersama. Coba gratis 30 hari, tanpa kartu kredit.",
    url: "https://flowku.my.id",
    siteName: "Flowku",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flowku — Kelola Keuangan Bersama Pasangan",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowku — Kelola Keuangan Bersama Pasangan",
    description:
      "Flowku membantu pasangan dan individu mencatat keuangan bersama. Coba gratis 30 hari.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://flowku.my.id",
  },
  keywords: [
    "aplikasi keuangan pasangan",
    "catat keuangan bersama",
    "financial tracker couple Indonesia",
    "aplikasi budgeting",
    "manajemen keuangan keluarga",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${plusJakartaSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

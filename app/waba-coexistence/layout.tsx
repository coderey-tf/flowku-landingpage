import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect WhatsApp Business Coexistence — Flowku",
  description:
    "Hubungkan WhatsApp Business tanpa logout dari HP menggunakan Mode Coexistence Meta WABA Embedded Signup.",
};

export default function WabaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

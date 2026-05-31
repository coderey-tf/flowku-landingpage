import type { Metadata } from "next";
import Link from "next/link";
import { Zap, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Flowku",
  description:
    "Pelajari bagaimana Flowku mengumpulkan, menggunakan, dan melindungi data pribadi kamu.",
};

export default function PrivacyPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-dark)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-plus-jakarta-sans)",
      }}
    >
      {/* Simple Navbar */}
      <nav
        style={{
          background: "blur(20px)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: "linear-gradient(135deg, #1A9E6E 0%, #0F2D1C 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={16} color="white" fill="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 18, color: "#E8F5EE" }}>
            Flowku
          </span>
        </Link>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          <ArrowLeft size={16} />
          Kembali ke Beranda
        </Link>
      </nav>

      {/* Content */}
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "60px 24px 100px",
        }}
      >
        <div style={{ marginBottom: 48 }}>
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              color: "var(--text-primary)",
              marginBottom: 12,
            }}
          >
            Kebijakan Privasi
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            Terakhir diperbarui: 29 Mei 2026
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
            fontSize: 15,
            lineHeight: 1.8,
            color: "var(--text-secondary)",
          }}
        >
          <Section title="1. Pendahuluan">
            <p>
              Flowku (&quot;kami&quot;, &quot;kita&quot;) berkomitmen untuk
              melindungi privasi pengguna. Kebijakan Privasi ini menjelaskan
              bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi
              pribadi Anda saat menggunakan layanan Flowku di{" "}
              <a
                href="https://app.flowku.my.id"
                style={{ color: "var(--brand-primary-light)" }}
              >
                app.flowku.my.id
              </a>
              .
            </p>
          </Section>

          <Section title="2. Data yang Kami Kumpulkan">
            <p>Kami mengumpulkan data berikut saat Anda menggunakan Flowku:</p>
            <ul
              style={{
                paddingLeft: 20,
                marginTop: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <li>
                <strong style={{ color: "var(--text-primary)" }}>
                  Informasi Akun:
                </strong>{" "}
                Nama, alamat email, dan password (dienkripsi) yang Anda berikan
                saat mendaftar.
              </li>
              <li>
                <strong style={{ color: "var(--text-primary)" }}>
                  Data Keuangan:
                </strong>{" "}
                Catatan transaksi, kategori pengeluaran, anggaran, dan goals
                yang Anda masukkan secara manual.
              </li>
              <li>
                <strong style={{ color: "var(--text-primary)" }}>
                  Data Penggunaan:
                </strong>{" "}
                Informasi tentang bagaimana Anda menggunakan aplikasi, termasuk
                fitur yang diakses dan waktu penggunaan.
              </li>
              <li>
                <strong style={{ color: "var(--text-primary)" }}>
                  Data Teknis:
                </strong>{" "}
                Jenis perangkat, sistem operasi, dan informasi browser untuk
                keperluan diagnosis dan peningkatan layanan.
              </li>
            </ul>
          </Section>

          <Section title="3. Bagaimana Kami Menggunakan Data Anda">
            <p>Data yang kami kumpulkan digunakan untuk:</p>
            <ul
              style={{
                paddingLeft: 20,
                marginTop: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <li>Menyediakan dan meningkatkan layanan Flowku</li>
              <li>Memproses dan menyimpan catatan keuangan Anda</li>
              <li>Mengirimkan notifikasi dan pembaruan layanan yang relevan</li>
              <li>
                Mendiagnosis masalah teknis dan meningkatkan performa aplikasi
              </li>
              <li>Memenuhi kewajiban hukum yang berlaku</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              <strong style={{ color: "var(--text-primary)" }}>
                Kami tidak pernah menjual data Anda kepada pihak ketiga.
              </strong>
            </p>
          </Section>

          <Section title="4. Keamanan Data">
            <p>
              Keamanan data Anda adalah prioritas utama kami. Kami menggunakan
              infrastruktur Firebase (Google Cloud) yang menyediakan enkripsi
              data at-rest dan in-transit. Akses ke data Anda dibatasi hanya
              untuk Anda dan (jika menggunakan Mode Couple) pasangan yang Anda
              undang secara eksplisit.
            </p>
            <p style={{ marginTop: 12 }}>
              Meski demikian, tidak ada sistem yang 100% aman. Kami menyarankan
              Anda menggunakan password yang kuat dan tidak membagikan
              kredensial akun kepada siapapun.
            </p>
          </Section>

          <Section title="5. Berbagi Data dengan Pihak Ketiga">
            <p>
              Kami dapat berbagi data dengan pihak ketiga terpercaya hanya dalam
              kondisi berikut:
            </p>
            <ul
              style={{
                paddingLeft: 20,
                marginTop: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <li>
                <strong style={{ color: "var(--text-primary)" }}>
                  Penyedia Layanan:
                </strong>{" "}
                Firebase/Google untuk infrastruktur dan penyimpanan data.
              </li>
              <li>
                <strong style={{ color: "var(--text-primary)" }}>
                  Analitik:
                </strong>{" "}
                Google Analytics untuk memahami penggunaan layanan secara
                anonim.
              </li>
              <li>
                <strong style={{ color: "var(--text-primary)" }}>
                  Kewajiban Hukum:
                </strong>{" "}
                Jika diwajibkan oleh hukum atau perintah pengadilan.
              </li>
            </ul>
          </Section>

          <Section title="6. Hak-Hak Pengguna">
            <p>Sebagai pengguna Flowku, Anda memiliki hak untuk:</p>
            <ul
              style={{
                paddingLeft: 20,
                marginTop: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <li>
                <strong style={{ color: "var(--text-primary)" }}>Akses:</strong>{" "}
                Melihat semua data yang kami simpan tentang Anda.
              </li>
              <li>
                <strong style={{ color: "var(--text-primary)" }}>
                  Koreksi:
                </strong>{" "}
                Memperbarui atau memperbaiki data yang tidak akurat.
              </li>
              <li>
                <strong style={{ color: "var(--text-primary)" }}>
                  Penghapusan:
                </strong>{" "}
                Meminta penghapusan akun dan semua data terkait.
              </li>
              <li>
                <strong style={{ color: "var(--text-primary)" }}>
                  Portabilitas:
                </strong>{" "}
                Mengekspor data keuangan Anda dalam format yang dapat dibaca.
              </li>
            </ul>
            <p style={{ marginTop: 12 }}>
              Untuk menggunakan hak-hak ini, hubungi kami di{" "}
              <a
                href="mailto:support@flowku.my.id"
                style={{ color: "var(--brand-primary-light)" }}
              >
                support@flowku.my.id
              </a>
              .
            </p>
          </Section>

          <Section title="7. Perubahan Kebijakan">
            <p>
              Kami dapat memperbarui Kebijakan Privasi ini sewaktu-waktu.
              Perubahan signifikan akan diberitahukan melalui email atau
              notifikasi dalam aplikasi. Penggunaan berkelanjutan Anda setelah
              perubahan berlaku dianggap sebagai persetujuan terhadap kebijakan
              yang diperbarui.
            </p>
          </Section>

          <Section title="8. Hubungi Kami">
            <p>
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini,
              hubungi kami:
            </p>
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: 20,
                marginTop: 12,
              }}
            >
              <p>
                📧 Email:{" "}
                <a
                  href="mailto:support@flowku.my.id"
                  style={{ color: "var(--brand-primary-light)" }}
                >
                  support@flowku.my.id
                </a>
              </p>
              <p style={{ marginTop: 6 }}>
                🌐 Website:{" "}
                <a
                  href="https://flowku.my.id"
                  style={{ color: "var(--brand-primary-light)" }}
                >
                  flowku.my.id
                </a>
              </p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: 16,
          paddingBottom: 10,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {children}
      </div>
    </div>
  );
}

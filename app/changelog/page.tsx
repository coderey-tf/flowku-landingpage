import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Rocket, Zap, Bug, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Changelog — Flowku",
  description: "Pembaruan terbaru, perbaikan bug, dan fitur baru di Flowku.",
};

const changelogs = [
  {
    version: "v1.1.0",
    date: "11 Juni 2026",
    title: "Perbaikan UI & PWA Update",
    type: "update",
    changes: [
      "Angka 'Rata-rata/hari' di halaman Laporan kini tidak lagi menampilkan desimal panjang.",
      "Kartu kategori anggaran dirombak ulang — layout berlapis 3 baris agar lebih lapang dan mudah dibaca di layar kecil.",
      "Nama kategori yang panjang kini terpotong rapi dengan ellipsis dan tidak mendesak tombol lain.",
      "Informasi sisa anggaran kini ditampilkan dengan label 'Sisa Rp...' atau 'Lewat Rp...' yang lebih jelas.",
      "Notifikasi update PWA diperbaiki — toast muncul lebih cepat segera setelah versi baru siap.",
      "User kini punya kendali penuh: klik tombol 'Perbarui' untuk menerapkan update, halaman tidak lagi reload sendiri tanpa izin.",
    ],
  },
  {
    version: "v1.0.4",
    date: "10 Juni 2026",
    title: "Form Transaksi Baru",
    type: "feature",
    changes: [
      "Form tambah dan edit transaksi diperbarui dengan tampilan yang lebih lengkap dan intuitif.",
      "Perbaikan tampilan halaman Profil.",
    ],
  },
  {
    version: "v1.0.3",
    date: "10 Juni 2026",
    title: "Modul Anggaran & Laporan",
    type: "feature",
    changes: [
      "Fitur Anggaran (Budget) baru — atur batas pengeluaran per kategori dengan progress bar dan notifikasi jika melebihi batas.",
      "Halaman Laporan diperbarui dengan grafik mingguan, pie chart per kategori, dan perbandingan bulan sebelumnya.",
      "Pembaruan halaman Goals, Profil, dan alur Onboarding.",
      "Keamanan Firestore diperketat dengan aturan akses yang lebih spesifik.",
    ],
  },
  {
    version: "v1.0.2",
    date: "6 Juni 2026",
    title: "Detail & Edit Transaksi",
    type: "feature",
    changes: [
      "Tap transaksi untuk melihat detail lengkap, mengedit, atau menghapus langsung dari modal.",
      "Sinkronisasi data pasangan lebih andal dan akurat.",
    ],
  },
  {
    version: "v1.0.1",
    date: "4 Juni 2026",
    title: "Kategori Kustom & Contextual Help",
    type: "feature",
    changes: [
      "Kategori Kustom — tambah dan kelola kategori pengeluaran/pemasukan sendiri sesuai preferensi.",
      "Contextual Help System — tooltip dan walkthrough panduan fitur untuk membantu pengguna baru.",
      "Halaman Transaksi kini mendukung infinite scroll, pencarian, filter kategori, dan filter rentang tanggal.",
    ],
  },
  {
    version: "v1.0.0",
    date: "2 Juni 2026",
    title: "Initial Release",
    type: "release",
    changes: [
      "Peluncuran resmi Flowku — Aplikasi pencatatan keuangan untuk pasangan dan individu.",
      "Fitur Mode Couple untuk mencatat dan memantau keuangan berdua secara real-time.",
      "Dashboard interaktif dengan ringkasan pengeluaran dan pemasukan.",
      "Fitur Goals untuk menabung bersama mencapai target.",
      "Laporan analitik pengeluaran berdasarkan kategori.",
      "Dukungan Progressive Web App (PWA) agar Flowku bisa diinstal ke Home Screen (Android/iOS).",
    ],
  },
];


const getTypeIcon = (type: string) => {
  switch (type) {
    case "feature":
      return <Star size={16} color="var(--brand-teal)" />;
    case "bugfix":
      return <Bug size={16} color="var(--brand-pink)" />;
    case "release":
      return <Rocket size={16} color="var(--brand-primary-light)" />;
    default:
      return <Zap size={16} color="var(--brand-primary-light)" />;
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "feature":
      return "New Feature";
    case "bugfix":
      return "Bug Fixes";
    case "release":
      return "Release";
    default:
      return "Update";
  }
};

export default function ChangelogPage() {
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
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={16} />
          Kembali ke Beranda
        </Link>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <img src="/flowku-logo-horizontal.svg" alt="Flowku" style={{ height: 28 }} />
        </Link>
        <div style={{ width: 150 }} /> {/* Spacer */}
      </nav>

      {/* Header */}
      <header
        style={{
          padding: "80px 24px 60px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -150,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 400,
            background: "radial-gradient(circle, rgba(26,158,110,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-1px",
            marginBottom: 16,
            position: "relative",
          }}
        >
          Changelog
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: 18,
            maxWidth: 600,
            margin: "0 auto",
            lineHeight: 1.6,
            position: "relative",
          }}
        >
          Pembaruan terbaru, perbaikan bug, dan fitur baru di Flowku.
        </p>
      </header>

      {/* Timeline Content */}
      <main
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "60px 24px 100px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {changelogs.map((log, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: 32,
              }}
              className="changelog-grid"
            >
              {/* Left Column: Date & Version */}
              <div style={{ paddingTop: 6 }}>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  {log.date}
                </p>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(255,255,255,0.05)",
                    padding: "4px 10px",
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {log.version}
                </div>
              </div>

              {/* Right Column: Content */}
              <div
                className="glass-card"
                style={{
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: "rgba(255,255,255,0.05)",
                      padding: "4px 12px",
                      borderRadius: 100,
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {getTypeIcon(log.type)}
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {getTypeLabel(log.type)}
                    </span>
                  </div>
                </div>

                <h2
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  {log.title}
                </h2>

                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                  }}
                >
                  {log.changes.map((change, i) => (
                    <li
                      key={i}
                      style={{
                        position: "relative",
                        paddingLeft: 20,
                        color: "var(--text-secondary)",
                        fontSize: 15,
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 8,
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--brand-primary)",
                        }}
                      />
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Simple Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "40px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
          © 2026 Flowku. All rights reserved.
        </p>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .changelog-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          nav {
            padding: 0 16px !important;
          }
          nav > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

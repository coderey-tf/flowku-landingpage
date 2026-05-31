"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Apakah Flowku tersedia di Play Store / App Store?",
    answer:
      "Flowku adalah Web App modern yang bisa diakses langsung dari browser tanpa perlu mengunduh aplikasi berukuran besar! Cukup buka Flowku, masuk di menu profil, lalu pilih 'Install Aplikasi' (Android) atau 'Add to Home Screen' dari menu Share (iOS) agar Flowku muncul di layar utama layaknya aplikasi biasa.",
  },
  {
    question: "Apakah data keuangan saya aman?",
    answer:
      "Ya, absolut. Data kamu dienkripsi end-to-end dan disimpan di infrastruktur Firebase yang dikelola Google. Kami tidak pernah menjual atau membagikan data kamu ke pihak ketiga. Kamu bisa melihat Kebijakan Privasi kami untuk detail lengkap.",
  },
  {
    question: "Apa yang terjadi setelah trial 30 hari habis?",
    answer:
      "Akun kamu otomatis turun ke plan Free. Semua data dan transaksi yang sudah dicatat tetap aman dan bisa diakses. Kamu hanya kehilangan akses ke fitur Premium seperti Mode Couple, Goals, dan laporan lengkap. Upgrade kapan saja untuk mendapatkan kembali akses penuh.",
  },
  {
    question: "Apakah bisa digunakan sendiri (tanpa pasangan)?",
    answer:
      "Tentu! Flowku juga sempurna untuk pengguna individu yang ingin mencatat keuangan pribadi, membuat budget, dan melihat laporan pengeluaran. Mode Couple adalah fitur opsional — kamu bisa pakai Flowku tanpa menghubungkan akun pasangan.",
  },
  {
    question: "Bagaimana cara upgrade ke Premium?",
    answer:
      'Buka menu Pengaturan di aplikasi, pilih "Upgrade ke Premium", lalu pilih paket bulanan atau tahunan. Pembayaran dilakukan melalui transfer bank atau dompet digital yang tersedia. Akses Premium aktif secara instan setelah pembayaran dikonfirmasi.',
  },
  {
    question: "Apakah bisa cancel kapan saja?",
    answer:
      "Ya, kamu bisa cancel subscription kapanpun tanpa denda atau biaya tambahan. Akses Premium tetap aktif hingga akhir periode yang sudah dibayar. Setelah itu, akun otomatis kembali ke Free.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="section"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 0",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 64,
            alignItems: "start",
          }}
          className="faq-grid"
        >
          {/* Left — Header */}
          <div style={{ position: "sticky", top: 100 }} className="faq-header">
            <span
              className="section-badge"
              style={{ marginBottom: 20, display: "inline-flex" }}
            >
              <HelpCircle size={13} />
              FAQ
            </span>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 800,
                letterSpacing: "-1px",
                color: "var(--text-primary)",
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              Pertanyaan yang{" "}
              <span className="gradient-text">sering ditanya</span>
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: 16,
                lineHeight: 1.65,
              }}
            >
              Belum menemukan jawaban yang kamu cari? Hubungi kami di{" "}
              <a
                href="mailto:support@flowku.my.id"
                style={{
                  color: "var(--brand-primary-light)",
                  textDecoration: "none",
                }}
              >
                support@flowku.my.id
              </a>
            </p>
          </div>

          {/* Right — Accordion */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass-card"
                style={{
                  overflow: "hidden",
                  cursor: "pointer",
                  transform: "none",
                  transition: "all 0.3s ease",
                  background:
                    openIndex === i
                      ? "rgba(124,58,237,0.08)"
                      : "var(--glass-bg)",
                  borderColor:
                    openIndex === i
                      ? "rgba(124,58,237,0.3)"
                      : "var(--glass-border)",
                }}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {/* Question */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                    gap: 16,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color:
                        openIndex === i
                          ? "var(--brand-primary-light)"
                          : "var(--text-primary)",
                      transition: "color 0.2s ease",
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.question}
                  </h3>
                  <div
                    style={{
                      color:
                        openIndex === i
                          ? "var(--brand-primary-light)"
                          : "var(--text-muted)",
                      transform:
                        openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease, color 0.2s ease",
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown size={20} />
                  </div>
                </div>

                {/* Answer */}
                <div
                  style={{
                    maxHeight: openIndex === i ? "300px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.35s ease",
                  }}
                >
                  <p
                    style={{
                      padding: "0 24px 20px",
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .faq-header {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}

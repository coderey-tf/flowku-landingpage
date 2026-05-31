import type { Metadata } from "next";
import Link from "next/link";
import { Zap, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan — Flowku",
  description:
    "Syarat dan ketentuan penggunaan layanan Flowku, termasuk ketentuan subscription, pembayaran, dan kebijakan refund.",
};

export default function TermsPage() {
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
            Syarat & Ketentuan
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
          <Section title="1. Penerimaan Syarat">
            <p>
              Dengan mendaftar atau menggunakan layanan Flowku
              (&quot;Layanan&quot;), Anda menyetujui untuk terikat oleh Syarat &
              Ketentuan ini. Jika Anda tidak menyetujui syarat-syarat ini, harap
              tidak menggunakan Layanan kami.
            </p>
          </Section>

          <Section title="2. Deskripsi Layanan">
            <p>
              Flowku adalah aplikasi manajemen keuangan yang memungkinkan
              pengguna untuk mencatat transaksi, membuat anggaran, menetapkan
              goals finansial, dan (untuk pengguna Premium) berbagi data
              keuangan dengan pasangan secara real-time.
            </p>
            <p style={{ marginTop: 8 }}>
              Layanan ini tersedia melalui{" "}
              <a
                href="https://app.flowku.my.id"
                style={{ color: "var(--brand-primary-light)" }}
              >
                app.flowku.my.id
              </a>{" "}
              dan dapat diakses melalui browser web.
            </p>
          </Section>

          <Section title="3. Akun Pengguna">
            <p>Untuk menggunakan Flowku, Anda harus:</p>
            <ul
              style={{
                paddingLeft: 20,
                marginTop: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <li>Berusia minimal 17 tahun</li>
              <li>
                Memberikan informasi yang akurat dan lengkap saat pendaftaran
              </li>
              <li>Menjaga kerahasiaan password akun Anda</li>
              <li>
                Bertanggung jawab atas semua aktivitas yang terjadi di akun Anda
              </li>
            </ul>
            <p style={{ marginTop: 12 }}>
              Kami berhak menangguhkan atau menghapus akun yang melanggar Syarat
              & Ketentuan ini.
            </p>
          </Section>

          <Section title="4. Ketentuan Subscription & Pembayaran">
            <p>Flowku menawarkan dua plan:</p>
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
                  Plan Free:
                </strong>{" "}
                Gratis selamanya dengan fitur dasar (pencatatan transaksi,
                budget, laporan 7 hari).
              </li>
              <li>
                <strong style={{ color: "var(--text-primary)" }}>
                  Plan Premium:
                </strong>{" "}
                Rp 19.000/bulan atau Rp 149.000/tahun, memberikan akses ke semua
                fitur termasuk Mode Couple, Goals, laporan lengkap, dan WhatsApp
                Bot.
              </li>
            </ul>
            <p style={{ marginTop: 12 }}>
              Semua akun baru mendapatkan akses Premium gratis selama 30 hari.
              Pembayaran diproses setelah masa trial berakhir jika Anda memilih
              untuk upgrade.
            </p>
            <p style={{ marginTop: 8 }}>
              Pembayaran dilakukan di muka (bulanan atau tahunan) dan tidak
              dapat dikembalikan secara parsial. Harga dapat berubah
              sewaktu-waktu dengan pemberitahuan 30 hari sebelumnya.
            </p>
          </Section>

          <Section title="5. Kebijakan Refund">
            <p>
              Kami menawarkan refund penuh dalam 7 hari pertama setelah
              pembelian pertama, jika Anda tidak puas dengan layanan Premium.
              Setelah periode 7 hari, pembayaran tidak dapat dikembalikan.
            </p>
            <p style={{ marginTop: 8 }}>
              Untuk mengajukan refund, hubungi{" "}
              <a
                href="mailto:support@flowku.my.id"
                style={{ color: "var(--brand-primary-light)" }}
              >
                support@flowku.my.id
              </a>{" "}
              dalam 7 hari setelah tanggal pembelian dengan menyertakan bukti
              pembayaran.
            </p>
          </Section>

          <Section title="6. Pembatalan Subscription">
            <p>
              Anda dapat membatalkan subscription Premium kapan saja melalui
              pengaturan akun di aplikasi. Pembatalan akan efektif pada akhir
              periode billing yang sudah dibayar — akses Premium tetap aktif
              hingga saat itu. Setelah pembatalan, akun otomatis kembali ke plan
              Free.
            </p>
          </Section>

          <Section title="7. Pembatasan Tanggung Jawab">
            <p>
              Flowku disediakan &quot;sebagaimana adanya&quot; (as-is). Kami
              tidak memberikan jaminan bahwa:
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
              <li>Layanan akan selalu tersedia tanpa gangguan</li>
              <li>
                Data yang Anda masukkan akan bebas dari kesalahan input pengguna
              </li>
              <li>
                Layanan akan memenuhi semua kebutuhan finansial spesifik Anda
              </li>
            </ul>
            <p style={{ marginTop: 12 }}>
              Flowku tidak bertanggung jawab atas keputusan keuangan yang dibuat
              berdasarkan data dalam aplikasi. Layanan ini adalah alat bantu
              pencatatan, bukan konsultasi keuangan profesional.
            </p>
          </Section>

          <Section title="8. Perubahan Layanan">
            <p>
              Kami berhak mengubah, menambah, atau menghapus fitur dari Layanan
              kapan saja. Perubahan signifikan akan dikomunikasikan kepada
              pengguna melalui email atau notifikasi dalam aplikasi setidaknya
              14 hari sebelumnya.
            </p>
          </Section>

          <Section title="9. Hukum yang Berlaku">
            <p>
              Syarat & Ketentuan ini diatur oleh hukum Republik Indonesia.
              Setiap sengketa yang timbul akan diselesaikan secara musyawarah.
              Jika tidak tercapai kesepakatan, sengketa akan diselesaikan
              melalui pengadilan yang berwenang di Indonesia.
            </p>
          </Section>

          <Section title="10. Hubungi Kami">
            <p>Pertanyaan tentang Syarat & Ketentuan ini dapat diajukan ke:</p>
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

import { Users, Zap, Target, BarChart3, MessageCircle, Sparkles, Smartphone } from "lucide-react";

const features = [
  {
    icon: <Users size={24} />,
    title: "Mode Pasangan",
    description:
      "Sinkronisasi transaksi secara real-time dengan pasangan. Satu akun bersama, transparansi penuh.",
    gradient: "linear-gradient(135deg, #FF6584, #1A9E6E)",
    glow: "rgba(236,72,153,0.2)",
    comingSoon: false,
  },
  {
    icon: <Zap size={24} />,
    title: "Pencatatan Mudah",
    description:
      "Catat pemasukan & pengeluaran dalam hitungan detik. Kategorisasi otomatis, tidak perlu effort.",
    gradient: "linear-gradient(135deg, #1A9E6E, #0F2D1C)",
    glow: "rgba(124,58,237,0.2)",
    comingSoon: false,
  },
  {
    icon: <Target size={24} />,
    title: "Goals Bersama",
    description:
      "Nabung bareng untuk target tertentu dengan progress bar visual. Liburan, DP rumah, atau apapun.",
    gradient: "linear-gradient(135deg, #0F2D1C, #FFD166)",
    glow: "rgba(79,70,229,0.2)",
    comingSoon: false,
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Laporan Visual",
    description:
      "Grafik interaktif untuk evaluasi kebiasaan belanja. Tahu kemana uangmu pergi setiap saat.",
    gradient: "linear-gradient(135deg, #FFD166, #10B981)",
    glow: "rgba(14,165,233,0.2)",
    comingSoon: false,
  },
  {
    icon: <MessageCircle size={24} />,
    title: "WhatsApp Bot",
    description:
      "Catat transaksi langsung dari chat WhatsApp tanpa buka aplikasi. Kirim pesan, transaksi tercatat.",
    gradient: "linear-gradient(135deg, #10B981, #059669)",
    glow: "rgba(16,185,129,0.2)",
    comingSoon: true,
  },
  {
    icon: <Smartphone size={24} />,
    title: "Aplikasi Super Ringan",
    description:
      "Tanpa download ribet lewat App Store. Simpan Flowku ke Home Screen (PWA) dan gunakan seperti aplikasi native tanpa menghabiskan memori HP.",
    gradient: "linear-gradient(135deg, #1A9E6E, #FFD166)",
    glow: "rgba(26,158,110,0.2)",
    comingSoon: false,
  },
];

export default function Features() {
  return (
    <section
      id="fitur"
      className="section"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 0",
      }}
    >
      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="section-badge" style={{ marginBottom: 20, display: "inline-flex" }}>
            <Sparkles size={13} />
            Fitur Unggulan
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              color: "var(--text-primary)",
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Semua yang kamu butuhkan{" "}
            <span className="gradient-text">dalam satu aplikasi</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 17, maxWidth: 500, margin: "0 auto" }}>
            Dirancang khusus untuk pasangan, juga sempurna untuk pengguna individu.
          </p>
        </div>

        {/* Feature grid — 3 rows x 2 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
          }}
          className="feature-grid-top"
        >
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .feature-grid-top {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function FeatureCard({ feature }: { feature: (typeof features)[0] }) {
  return (
    <div
      className="glass-card"
      style={{
        padding: 32,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: feature.gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          marginBottom: 20,
          boxShadow: `0 8px 24px ${feature.glow}`,
          flexShrink: 0,
        }}
      >
        {feature.icon}
      </div>

      {/* Title + badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          {feature.title}
        </h3>
        {feature.comingSoon && (
          <span
            style={{
              background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.2))",
              border: "1px solid rgba(16,185,129,0.4)",
              color: "#10B981",
              padding: "3px 10px",
              borderRadius: 100,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
            }}
          >
            Coming Soon
          </span>
        )}
      </div>

      <p
        style={{
          fontSize: 14,
          color: "var(--text-secondary)",
          lineHeight: 1.6,
        }}
      >
        {feature.description}
      </p>

      {/* Glow background */}
      <div
        style={{
          position: "absolute",
          bottom: -20,
          right: -20,
          width: 120,
          height: 120,
          background: `radial-gradient(circle, ${feature.glow} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

import { UserPlus, Link2, Eye } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <UserPlus size={28} />,
    title: "Daftar",
    description:
      "Buat akun gratis dalam hitungan menit. Trial Premium 30 hari langsung aktif — tanpa kartu kredit.",
    gradient: "linear-gradient(135deg, #FF6584, #1A9E6E)",
    glow: "rgba(124,58,237,0.25)",
  },
  {
    number: "02",
    icon: <Link2 size={28} />,
    title: "Hubungkan",
    description:
      "Invite pasangan dengan kode unik yang dibuat otomatis. Satu langkah, langsung terhubung.",
    gradient: "linear-gradient(135deg, #1A9E6E, #0F2D1C)",
    glow: "rgba(79,70,229,0.25)",
  },
  {
    number: "03",
    icon: <Eye size={28} />,
    title: "Pantau Bersama",
    description:
      "Catat transaksi, lihat laporan bersama, dan capai goals finansial berdua — secara real-time.",
    gradient: "linear-gradient(135deg, #0F2D1C, #FFD166)",
    glow: "rgba(14,165,233,0.25)",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="cara-kerja"
      className="section"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 0",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(124,58,237,0.04) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="section-badge" style={{ marginBottom: 20, display: "inline-flex" }}>
            🚀 Cara Kerja
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
            Mulai dalam{" "}
            <span className="gradient-text">3 langkah mudah</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 17, maxWidth: 480, margin: "0 auto" }}>
            Tidak perlu tutorial panjang. Langsung pakai, langsung terasa manfaatnya.
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
            position: "relative",
          }}
          className="steps-grid"
        >
          {/* Connector line (desktop only) */}
          <div
            style={{
              position: "absolute",
              top: 60,
              left: "calc(33.33% - 8px)",
              right: "calc(33.33% - 8px)",
              height: 2,
              background:
                "linear-gradient(90deg, rgba(124,58,237,0.4) 0%, rgba(79,70,229,0.4) 50%, rgba(14,165,233,0.4) 100%)",
              zIndex: 0,
            }}
            className="connector-line"
          />

          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: step.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  marginBottom: 24,
                  boxShadow: `0 8px 32px ${step.glow}`,
                  position: "relative",
                  border: "4px solid var(--bg-dark)",
                }}
              >
                {step.icon}
                {/* Step number badge */}
                <div
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "var(--bg-dark)",
                    border: "2px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 800,
                    color: "var(--text-primary)",
                  }}
                >
                  {i + 1}
                </div>
              </div>

              <div
                className="glass-card"
                style={{
                  padding: 28,
                  width: "100%",
                }}
              >
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: 12,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
          .connector-line {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

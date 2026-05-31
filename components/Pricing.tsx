import { Check, X, Star, ArrowRight } from "lucide-react";

const features = [
  { label: "Transaksi Unlimited", free: true, premium: true },
  { label: "Budget & Anggaran", free: true, premium: true },
  { label: "Laporan 7 Hari", free: true, premium: true },
  { label: "Mode Pasangan (Couple)", free: false, premium: true },
  { label: "Goals Bersama", free: false, premium: true },
  { label: "Laporan All Time", free: false, premium: true },
  { label: "WhatsApp Bot", free: false, premium: true },
];

export default function Pricing() {
  return (
    <section
      id="harga"
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
            💰 Harga
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
            Harga yang <span className="gradient-text">transparan & terjangkau</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 17, maxWidth: 480, margin: "0 auto" }}>
            Mulai gratis, upgrade kapan saja. Tidak ada biaya tersembunyi.
          </p>
        </div>

        {/* Trial notice */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(14,165,233,0.10) 100%)",
            border: "1px solid rgba(124,58,237,0.3)",
            borderRadius: 14,
            padding: "14px 24px",
            textAlign: "center",
            marginBottom: 40,
            maxWidth: 600,
            margin: "0 auto 40px",
          }}
        >
          <p style={{ color: "var(--text-primary)", fontSize: 14, fontWeight: 600 }}>
            🎉 Semua akun baru mendapatkan akses{" "}
            <span style={{ color: "var(--brand-primary-light)" }}>Premium gratis selama 30 hari</span> — tidak perlu kartu kredit.
          </p>
        </div>

        {/* Pricing cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            maxWidth: 860,
            margin: "0 auto",
          }}
          className="pricing-grid"
        >
          {/* Free Plan */}
          <div
            className="glass-card"
            style={{ padding: 40, display: "flex", flexDirection: "column", gap: 0 }}
          >
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>
                Free
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                <span
                  style={{
                    fontSize: 42,
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    letterSpacing: "-1.5px",
                  }}
                >
                  Gratis
                </span>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Selamanya. Tidak ada biaya.</p>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: f.free
                        ? "rgba(16,185,129,0.15)"
                        : "rgba(255,255,255,0.05)",
                      flexShrink: 0,
                    }}
                  >
                    {f.free ? (
                      <Check size={11} color="#10B981" strokeWidth={3} />
                    ) : (
                      <X size={11} color="rgba(241,241,255,0.3)" strokeWidth={3} />
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      color: f.free ? "var(--text-primary)" : "var(--text-muted)",
                      textDecoration: f.free ? "none" : "none",
                    }}
                  >
                    {f.label}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="https://app.flowku.my.id/register"
              id="pricing-free-cta"
              className="btn-outline"
              style={{
                padding: "14px 24px",
                fontSize: 15,
                fontWeight: 700,
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              Mulai Gratis
            </a>
          </div>

          {/* Premium Plan */}
          <div
            style={{
              background:
                "linear-gradient(160deg, rgba(124,58,237,0.15) 0%, rgba(79,70,229,0.10) 100%)",
              border: "1px solid rgba(124,58,237,0.35)",
              borderRadius: 16,
              padding: 40,
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 24px 80px rgba(124,58,237,0.2)",
            }}
          >
            {/* Popular badge */}
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "linear-gradient(135deg, #1A9E6E, #0F2D1C)",
                borderRadius: 100,
                padding: "5px 14px",
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                fontWeight: 700,
                color: "white",
                boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
              }}
            >
              <Star size={10} fill="white" />
              Paling Populer
            </div>

            {/* Glow */}
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 200,
                height: 200,
                background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ marginBottom: 32 }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--brand-primary-light)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: 8,
                }}
              >
                Premium
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                <span
                  style={{
                    fontSize: 42,
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    letterSpacing: "-1.5px",
                  }}
                >
                  Rp 19.000
                </span>
                <span style={{ fontSize: 16, color: "var(--text-secondary)" }}>/bulan</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                atau{" "}
                <span style={{ color: "var(--brand-primary-light)", fontWeight: 700 }}>
                  Rp 149.000/tahun
                </span>{" "}
                (hemat 35%)
              </p>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(124,58,237,0.2)",
                      flexShrink: 0,
                    }}
                  >
                    <Check size={11} color="#43D98F" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 14, color: "var(--text-primary)" }}>{f.label}</span>
                </div>
              ))}
            </div>

            <a
              href="https://app.flowku.my.id/register"
              id="pricing-premium-cta"
              className="btn-primary"
              style={{
                padding: "14px 24px",
                fontSize: 15,
                fontWeight: 700,
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              Mulai Gratis 30 Hari
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

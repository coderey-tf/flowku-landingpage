import { ArrowRight, ChevronDown, Sparkles, Shield, TrendingUp, Users } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: 120,
        paddingBottom: 80,
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left — Copy */}
          <div style={{ animation: "fadeInUp 0.8s ease forwards" }}>
            {/* Badge */}
            <div style={{ marginBottom: 24 }}>
              <span className="section-badge">
                <Sparkles size={13} />
                Trial Premium 30 Hari Gratis
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 58px)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-1.5px",
                marginBottom: 20,
                color: "var(--text-primary)",
              }}
            >
              Kelola Keuangan{" "}
              <span className="gradient-text">Bersama Pasangan,</span>{" "}
              Tanpa Ribet.
            </h1>

            {/* Subheadline */}
            <p
              style={{
                fontSize: "clamp(16px, 2vw, 18px)",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: 36,
                maxWidth: 500,
              }}
            >
              Flowku membantu kamu dan pasangan mencatat transaksi, membuat anggaran, 
              dan mencapai goals finansial bersama — secara real-time, dari satu aplikasi.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
              <a
                href="https://app.flowku.my.id/register"
                id="hero-cta-primary"
                className="btn-primary"
                style={{ padding: "15px 28px", fontSize: 15, fontWeight: 700 }}
              >
                Coba Gratis 30 Hari
                <ArrowRight size={18} />
              </a>
              <a
                href="#fitur"
                id="hero-cta-secondary"
                className="btn-outline"
                style={{ padding: "15px 28px", fontSize: 15, fontWeight: 700 }}
              >
                Lihat Fitur
                <ChevronDown size={18} />
              </a>
            </div>

            {/* Trust indicators */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              {[
                { icon: <Shield size={15} />, text: "Data Aman & Terenkripsi" },
                { icon: <TrendingUp size={15} />, text: "Real-time Sync" },
                { icon: <Users size={15} />, text: "Untuk Pasangan & Individu" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "var(--text-secondary)",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  <span style={{ color: "var(--brand-primary-light)" }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — App Mockup */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              animation: "fadeInUp 0.8s ease 0.2s forwards",
              opacity: 0,
            }}
          >
            <AppMockup />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}

function AppMockup() {
  return (
    <div className="animate-float" style={{ width: "100%", maxWidth: 400, position: "relative" }}>
      {/* Main phone mockup */}
      <div
        style={{
          background: "linear-gradient(160deg, rgba(124,58,237,0.12) 0%, rgba(14,165,233,0.08) 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 32,
          padding: 24,
          backdropFilter: "blur(20px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 2 }}>Saldo Bersama</p>
            <p style={{ fontSize: 26, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
              Rp 4.250.000
            </p>
          </div>
          <div
            style={{
              background: "linear-gradient(135deg, #1A9E6E, #0F2D1C)",
              borderRadius: 12,
              padding: "8px 14px",
              fontSize: 12,
              fontWeight: 600,
              color: "white",
            }}
          >
            💑 Mode Couple
          </div>
        </div>

        {/* Chart bars */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>Pengeluaran Bulan Ini</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#FF6584" }}>Rp 2.100.000</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 60 }}>
            {[40, 65, 45, 80, 55, 70, 48].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  background: i === 3
                    ? "linear-gradient(to top, #1A9E6E, #43D98F)"
                    : "rgba(124,58,237,0.3)",
                  borderRadius: "4px 4px 0 0",
                  transition: "height 0.3s ease",
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: 6 }}>
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={i} style={{ fontSize: 10, color: "var(--text-muted)", flex: 1, textAlign: "center" }}>{d}</span>
            ))}
          </div>
        </div>

        {/* Goals progress */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>🎯 Goals: Liburan Bali</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--brand-teal)" }}>68%</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 100, height: 8 }}>
            <div
              style={{
                width: "68%",
                height: "100%",
                background: "linear-gradient(90deg, #1A9E6E, #FFD166)",
                borderRadius: 100,
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Rp 3.400.000 terkumpul</span>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Target: Rp 5.000.000</span>
          </div>
        </div>

        {/* Recent transactions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { emoji: "🛒", label: "Groceries", who: "Kamu", amount: "-Rp 185.000", color: "#FF6584" },
            { emoji: "☕", label: "Kafe", who: "Pasangan", amount: "-Rp 65.000", color: "#FF6584" },
            { emoji: "💼", label: "Gaji Bulan Ini", who: "Kamu", amount: "+Rp 6.500.000", color: "#10B981" },
          ].map((tx, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "rgba(255,255,255,0.04)",
                borderRadius: 12,
                padding: "10px 14px",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {tx.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 1 }}>{tx.label}</p>
                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{tx.who}</p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: tx.color, flexShrink: 0 }}>{tx.amount}</span>
            </div>
          ))}
        </div>

        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 200,
            height: 200,
            background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Floating badge */}
      <div
        style={{
          position: "absolute",
          top: -16,
          right: -16,
          background: "linear-gradient(135deg, #10B981, #059669)",
          borderRadius: 12,
          padding: "8px 14px",
          fontSize: 12,
          fontWeight: 700,
          color: "white",
          boxShadow: "0 8px 24px rgba(16,185,129,0.4)",
          animation: "pulse-glow 2s ease-in-out infinite",
          whiteSpace: "nowrap",
        }}
      >
        ✨ Real-time Sync
      </div>

      {/* Small floating card */}
      <div
        style={{
          position: "absolute",
          bottom: -20,
          left: -20,
          background: "rgba(15, 45, 28, 0.9)",
          backdropFilter: "blur(16px)",
          borderRadius: 14,
          padding: "12px 16px",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px rgba(79,70,229,0.4)",
        }}
      >
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 2 }}>Nabung bersama 💜</p>
        <p style={{ fontSize: 14, fontWeight: 700, color: "white" }}>+Rp 500.000</p>
      </div>
    </div>
  );
}

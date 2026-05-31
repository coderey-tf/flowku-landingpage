import { ArrowRight, Sparkles } from "lucide-react";

export default function CTAFinal() {
  return (
    <section
      className="section"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 0",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.20) 0%, rgba(79,70,229,0.15) 50%, rgba(14,165,233,0.10) 100%)",
            border: "1px solid rgba(124,58,237,0.25)",
            borderRadius: 28,
            padding: "72px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Background glows */}
          <div
            style={{
              position: "absolute",
              top: -80,
              left: "50%",
              transform: "translateX(-50%)",
              width: 400,
              height: 400,
              background:
                "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 250,
              height: 250,
              background:
                "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -60,
              right: -60,
              width: 250,
              height: 250,
              background:
                "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ marginBottom: 24 }}>
              <span className="section-badge">
                <Sparkles size={13} />
                Mulai Sekarang
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(28px, 4.5vw, 52px)",
                fontWeight: 800,
                letterSpacing: "-1.5px",
                color: "var(--text-primary)",
                marginBottom: 16,
                lineHeight: 1.15,
              }}
            >
              Mulai kelola keuangan{" "}
              <span className="gradient-text">bersama hari ini.</span>
            </h2>

            <p
              style={{
                fontSize: "clamp(15px, 2vw, 18px)",
                color: "var(--text-secondary)",
                marginBottom: 40,
                maxWidth: 480,
                margin: "0 auto 40px",
                lineHeight: 1.65,
              }}
            >
              Gratis 30 hari, tidak perlu kartu kredit.{" "}
              <br />
              Bergabung dan rasakan bedanya dalam seminggu.
            </p>

            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://app.flowku.my.id/register"
                id="cta-final-register"
                className="btn-primary"
                style={{
                  padding: "16px 36px",
                  fontSize: 16,
                  fontWeight: 700,
                  borderRadius: 14,
                }}
              >
                Daftar Sekarang — Gratis
                <ArrowRight size={20} />
              </a>
              <a
                href="https://app.flowku.my.id/login"
                id="cta-final-login"
                className="btn-outline"
                style={{
                  padding: "16px 32px",
                  fontSize: 16,
                  fontWeight: 700,
                  borderRadius: 14,
                }}
              >
                Sudah punya akun? Masuk
              </a>
            </div>

            {/* Social proof */}
            <p
              style={{
                marginTop: 32,
                fontSize: 13,
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <span>🔒</span> Data aman & terenkripsi · Tidak ada komitmen · Cancel kapan saja
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

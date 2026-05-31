import { AlertCircle } from "lucide-react";

const painPoints = [
  {
    emoji: "😰",
    title: "Tidak tahu pasangan belanja berapa bulan ini.",
    description:
      "Keuangan jadi misterius. Akhir bulan tinggal bertanya-tanya uang pergi ke mana.",
  },
  {
    emoji: "🤯",
    title: "Susah sepakat soal anggaran bersama.",
    description:
      "Setiap diskusi soal uang berakhir dengan argumen. Tidak ada yang pegang data yang sama.",
  },
  {
    emoji: "📉",
    title: "Nabung bareng tapi tidak ada yang pantau progress-nya.",
    description:
      "Target sudah dibuat, tapi tidak ada visibilitas. Goals terasa jauh dan abstrak.",
  },
];

export default function ProblemStatement() {
  return (
    <section
      id="masalah"
      className="section-sm"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "80px 0",
      }}
    >
      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-badge" style={{ marginBottom: 20, display: "inline-flex" }}>
            <AlertCircle size={13} />
            Kenali Masalahnya
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
            Kenalan dengan <span className="gradient-text-warm">masalah yang familiar?</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 17, maxWidth: 480, margin: "0 auto" }}>
            Jutaan pasangan menghadapi masalah yang sama. Flowku hadir untuk mengakhirinya.
          </p>
        </div>

        {/* Pain point cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
          className="problem-grid"
        >
          {painPoints.map((point, i) => (
            <div
              key={i}
              className="glass-card"
              style={{
                padding: 32,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background gradient accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, 
                    ${i === 0 ? "#FF6584, #1A9E6E" : i === 1 ? "#1A9E6E, #0F2D1C" : "#0F2D1C, #FFD166"})`,
                }}
              />

              <div
                style={{
                  fontSize: 40,
                  marginBottom: 16,
                  lineHeight: 1,
                }}
              >
                {point.emoji}
              </div>

              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 12,
                  lineHeight: 1.4,
                }}
              >
                {point.title}
              </h3>

              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .problem-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .problem-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

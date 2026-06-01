import { ImageResponse } from "next/og";

// Route segment config
export const dynamic = "force-static";

// Image metadata
export const alt = "Flowku — Kelola Keuangan Bersama Pasangan";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0A1F14",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F2D1C",
          padding: "80px",
          borderRadius: "40px",
          border: "2px solid #1A9E6E",
          boxShadow: "0 20px 60px rgba(26, 158, 110, 0.3)",
          width: "90%",
          height: "85%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                width: 144,
                height: 144,
                backgroundColor: "#1A9E6E",
                borderRadius: 39,
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="144" height="144" viewBox="0 0 96 96">
                <path
                  d="M18 48 C28 30, 46 30, 56 48 C66 66, 84 66, 94 48"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                />
                <path
                  d="M18 66 C28 48, 46 48, 56 66 C66 84, 84 84, 94 66"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                  opacity="0.45"
                />
                <path
                  d="M18 84 C28 66, 46 66, 56 84 C66 102, 84 102, 94 84"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                  opacity="0.18"
                />
              </svg>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 30,
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 78,
                  fontWeight: 800,
                  letterSpacing: "-1.5px",
                  color: "#ffffff",
                  lineHeight: 1,
                }}
              >
                flowku
              </span>
              <span
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 22.5,
                  fontWeight: 600,
                  letterSpacing: "3px",
                  color: "#ffffff",
                  marginTop: 8,
                  lineHeight: 1,
                }}
              >
                FINANCIAL TRACKER
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}

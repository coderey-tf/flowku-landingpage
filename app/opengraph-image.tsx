import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

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
    (
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
              marginBottom: "30px",
            }}
          >
            <svg width="480" height="144" viewBox="0 0 320 96" xmlns="http://www.w3.org/2000/svg" role="img">
              <rect x="0" y="0" width="96" height="96" rx="26" fill="#1A9E6E"/>
              <path d="M18 48 C28 30, 46 30, 56 48 C66 66, 84 66, 94 48" fill="none" stroke="#ffffff" strokeWidth="6.5" strokeLinecap="round"/>
              <path d="M18 48 C28 30, 46 30, 56 48 C66 66, 84 66, 94 48" fill="none" stroke="#ffffff" strokeWidth="6.5" strokeLinecap="round" opacity="0.45" transform="translate(0,18)"/>
              <path d="M18 48 C28 30, 46 30, 56 48 C66 66, 84 66, 94 48" fill="none" stroke="#ffffff" strokeWidth="6.5" strokeLinecap="round" opacity="0.18" transform="translate(0,36)"/>

              <text x="116" y="60"
                fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                fontSize="52"
                fontWeight="800"
                letterSpacing="-1.5"
                fill="#ffffff">flowku</text>
              <text x="118" y="82"
                fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                fontSize="15"
                fontWeight="600"
                letterSpacing="3"
                fill="#ffffff">FINANCIAL TRACKER</text>
            </svg>
          </div>
          
          <p
            style={{
              fontSize: 42,
              color: "#43D98F",
              maxWidth: "80%",
              lineHeight: 1.4,
              fontWeight: 500,
              marginTop: "20px",
              marginBottom: "40px",
            }}
          >
            Kelola Keuangan Bersama Pasangan Tanpa Ribet
          </p>
          
          <div
            style={{
              display: "flex",
              background: "rgba(255, 255, 255, 0.05)",
              padding: "20px 40px",
              borderRadius: "100px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              fontSize: 32,
              color: "white",
            }}
          >
            flowku.my.id
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

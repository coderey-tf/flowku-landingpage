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
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "80px",
                height: "80px",
                background: "#1A9E6E",
                borderRadius: "20px",
                marginRight: "24px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "40px",
                  height: "40px",
                  background: "#0A1F14",
                  borderRadius: "10px",
                }}
              />
            </div>
            <h1
              style={{
                fontSize: 90,
                fontWeight: "bold",
                color: "#E8F5EE",
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.05em",
              }}
            >
              Flowku
            </h1>
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

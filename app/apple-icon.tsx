import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Flowku";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#1A9E6E",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 32 32">
          <path d="M5 16 C8 10, 14 10, 17 16 C20 22, 26 22, 29 16" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          <path d="M5 23 C8 17, 14 17, 17 23 C20 29, 26 29, 29 23" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
          <path d="M5 29 C8 23, 14 23, 17 29 C20 35, 26 35, 29 29" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.18" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}

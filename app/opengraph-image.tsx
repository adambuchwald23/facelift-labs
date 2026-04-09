import { ImageResponse } from "next/og";

export const alt = "Facelift Labs — Modern Websites Engineered to Convert";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fafafa 0%, #f0fdf4 50%, #fafafa 100%)",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#020202",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 30, fontWeight: 800, color: "#00FF88", lineHeight: 1, letterSpacing: -1.5, display: "flex", fontFamily: "Inter, system-ui, sans-serif" }}>
              FL
            </span>
          </div>
          <span style={{ fontSize: 48, fontWeight: 800, color: "#0a0a0a", letterSpacing: -1, display: "flex" }}>
            facelift
          </span>
          <div
            style={{
              background: "#00FF88",
              borderRadius: 8,
              padding: "4px 12px",
              display: "flex",
            }}
          >
            <span style={{ fontSize: 48, fontWeight: 800, color: "#0a0a0a", letterSpacing: -1, display: "flex" }}>
              labs
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 500,
            color: "#555",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          Modern websites engineered to convert.
        </div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";
import { getInterBold } from "./og-fonts";

export const alt = "Facelift Labs — Modern Websites Engineered to Convert";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const interBold = await getInterBold();

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
          fontFamily: "Inter",
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
              background: "#ffffff",
              border: "2px solid #e5e5e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 30, fontWeight: 800, color: "#020202", lineHeight: 1, letterSpacing: -1.5, display: "flex", fontFamily: "Inter" }}>
              F
            </span>
            <span style={{ fontSize: 30, fontWeight: 800, color: "#00FF88", lineHeight: 1, letterSpacing: -1.5, display: "flex", fontFamily: "Inter", marginLeft: -2 }}>
              L
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
    {
      ...size,
      fonts: [{ name: "Inter", data: interBold, weight: 800 as const, style: "normal" as const }],
    },
  );
}

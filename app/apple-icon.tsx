import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "#00FF88",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: "#020202",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          F
        </span>
      </div>
    ),
    { ...size },
  );
}

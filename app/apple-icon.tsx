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
          background: "#020202",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: "#00FF88",
            lineHeight: 1,
            letterSpacing: -4,
            fontFamily: "Inter, system-ui, sans-serif",
            display: "flex",
          }}
        >
          FL
        </span>
      </div>
    ),
    { ...size },
  );
}

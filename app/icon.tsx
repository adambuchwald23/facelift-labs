import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: "#020202",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#00FF88",
            lineHeight: 1,
            letterSpacing: -1,
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

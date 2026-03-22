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
          borderRadius: 8,
          background: "#00FF88",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#020202",
            lineHeight: 1,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          f
        </span>
      </div>
    ),
    { ...size },
  );
}

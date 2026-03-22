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
            fontSize: 130,
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

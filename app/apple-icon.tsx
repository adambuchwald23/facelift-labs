import { ImageResponse } from "next/og";
import { getInterBold } from "./og-fonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const interBold = await getInterBold();

  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: "#020202",
            lineHeight: 1,
            letterSpacing: -4,
            fontFamily: "Inter",
            display: "flex",
          }}
        >
          F
        </span>
        <span
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: "#00FF88",
            lineHeight: 1,
            letterSpacing: -4,
            fontFamily: "Inter",
            display: "flex",
            marginLeft: -6,
          }}
        >
          L
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Inter", data: interBold, weight: 800, style: "normal" }],
    },
  );
}

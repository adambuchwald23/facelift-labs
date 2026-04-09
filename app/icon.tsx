import { ImageResponse } from "next/og";
import { getInterBold } from "./og-fonts";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const interBold = await getInterBold();

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
          gap: 0,
        }}
      >
        <span
          style={{
            fontSize: 17,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1,
            fontFamily: "Inter",
            display: "flex",
          }}
        >
          F
        </span>
        <span
          style={{
            fontSize: 17,
            fontWeight: 800,
            color: "#00FF88",
            lineHeight: 1,
            fontFamily: "Inter",
            display: "flex",
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

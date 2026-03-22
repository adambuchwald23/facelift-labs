import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const pub = (p) => resolve(__dir, "../public", p);

const W = 988, H = 816;

// Screen area from screen-mask.png analysis
const SCREEN = { left: 215, top: 154, width: 556, height: 360 };

const projects = [
  { screenshot: "portfolio/screens/own-the-crowd-screenshot.png", out: "portfolio/project-1-own-the-crowd.png" },
  { screenshot: "portfolio/screens/mailkit-screenshot.png",        out: "portfolio/project-2-mailkit.png" },
  { screenshot: "portfolio/screens/assemble-screenshot.png",       out: "portfolio/project-3-assemble.png" },
  { screenshot: "portfolio/screens/fixa-screenshot.png",           out: "portfolio/project-4-fixa.png" },
];

// Layers (assembled bottom-to-top):
// 1. Light gray background
// 2. Website screenshot — cropped to screen area
// 3. Laptop body texture — masked by body-mask.png
// 4. Dark gray tint (#6a6a6a) on body — simulates space gray (multiply approximation)
// 5. MacBook frame overlay (screen area transparent, no shadow)

const bodyMask    = pub("device-frame/figma/body-mask.png");    // 988×816
const bodyTexture = pub("device-frame/figma/body-texture.png"); // 4096×2731
const framePng    = pub("device-frame/figma/macbook-frame.png"); // 4096×2731

async function buildImage({ screenshot, out }) {
  console.log(`Building ${out}...`);

  // Resize screenshot to fit the screen area
  const screenBuf = await sharp(pub(screenshot))
    .resize(SCREEN.width, SCREEN.height, { fit: "cover", position: "top" })
    .png()
    .toBuffer();

  // Place screenshot on transparent canvas at screen position
  const screenshotLayer = await sharp({
    create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: screenBuf, left: SCREEN.left, top: SCREEN.top }])
    .png()
    .toBuffer();

  // Resize body texture to 988×816 (cover center)
  const bodyTexBuf = await sharp(bodyTexture)
    .resize(W, H, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();

  // Load body mask (988×816 native)
  const bodyMaskBuf = await sharp(bodyMask).resize(W, H).png().toBuffer();

  // Apply body mask to body texture — produces masked body
  const maskedBody = await sharp(bodyTexBuf)
    .composite([{ input: bodyMaskBuf, blend: "dest-in" }])
    .png()
    .toBuffer();

  // Dark gray tint layer (#6a6a6a) shaped like the body mask — multiply approximation
  const tintBuf = await sharp({
    create: { width: W, height: H, channels: 4, background: { r: 106, g: 106, b: 106, alpha: 255 } },
  })
    .composite([{ input: bodyMaskBuf, blend: "dest-in" }])
    .png()
    .toBuffer();

  // MacBook frame (no shadow) resized to 988×816
  const frameBuf = await sharp(framePng)
    .resize(W, H, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();

  // Composite everything on a light gray (#f5f5f5) background
  const result = await sharp({
    create: { width: W, height: H, channels: 3, background: { r: 245, g: 245, b: 245 } },
  })
    .composite([
      { input: screenshotLayer, blend: "over" },   // screenshot in screen area
      { input: maskedBody,      blend: "multiply" }, // body texture (multiply gives dark tint)
      { input: tintBuf,         blend: "multiply" }, // extra dark tint for space gray
      { input: frameBuf,        blend: "over" },     // frame on top (screen transparent)
    ])
    .jpeg({ quality: 95 })
    .toFile(pub(out));

  console.log(`  → ${result.width}×${result.height}`);
}

for (const p of projects) {
  await buildImage(p);
}
console.log("Done.");

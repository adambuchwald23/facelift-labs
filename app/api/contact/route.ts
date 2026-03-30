import { NextResponse } from "next/server";
import { Resend } from "resend";

/* ── Rate limiter (sliding window, in-memory) ── */

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = hits.get(ip)?.filter((t) => now - t < RATE_WINDOW_MS) ?? [];
  if (timestamps.length >= RATE_MAX) return true;
  timestamps.push(now);
  hits.set(ip, timestamps);
  return false;
}

/* ── Helpers ── */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripControlChars(str: string): string {
  return str.replace(/[\r\n\t\x00-\x1f]/g, " ").trim();
}

const MAX_FIELD_LEN = 500;
const MAX_MESSAGE_LEN = 5000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ALLOWED_ORIGINS = [
  "https://faceliftlabs.com",
  "https://www.faceliftlabs.com",
  process.env.NEXT_PUBLIC_SITE_URL,
].filter(Boolean);

export async function POST(req: Request) {
  try {
    const origin = req.headers.get("origin") || req.headers.get("referer") || "";
    const originAllowed =
      !origin ||
      ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed!));
    if (!originAllowed) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 503 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 },
      );
    }

    const { firstName, lastName, email, phone, services, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 },
      );
    }

    if (
      typeof email !== "string" ||
      typeof message !== "string" ||
      email.length > MAX_FIELD_LEN ||
      message.length > MAX_MESSAGE_LEN
    ) {
      return NextResponse.json(
        { error: "Invalid input." },
        { status: 400 },
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const cleanEmail = stripControlChars(email);
    const cleanFirstName = stripControlChars(String(firstName || "")).slice(0, MAX_FIELD_LEN);
    const cleanLastName = stripControlChars(String(lastName || "")).slice(0, MAX_FIELD_LEN);

    const safe = {
      firstName: escapeHtml(cleanFirstName),
      lastName: escapeHtml(cleanLastName),
      email: escapeHtml(cleanEmail),
      phone: escapeHtml(stripControlChars(String(phone || "")).slice(0, MAX_FIELD_LEN)),
      services: Array.isArray(services)
        ? services
            .slice(0, 20)
            .map((s: unknown) => escapeHtml(stripControlChars(String(s)).slice(0, MAX_FIELD_LEN)))
        : [],
      message: escapeHtml(String(message)),
    };

    const toEmail = process.env.CONTACT_TO_EMAIL || "hello@faceliftlabs.com";

    const { error } = await resend.emails.send({
      from: "Facelift Labs <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: cleanEmail,
      subject: `New inquiry from ${cleanFirstName} ${cleanLastName}`.trim(),
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safe.firstName} ${safe.lastName}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        ${safe.phone ? `<p><strong>Phone:</strong> ${safe.phone}</p>` : ""}
        ${safe.services.length ? `<p><strong>Services:</strong> ${safe.services.join(", ")}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${safe.message.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend send failed:", (error as { statusCode?: number }).statusCode ?? "unknown");
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const code = err instanceof Error ? err.name : "UnknownError";
    console.error("Contact API error:", code);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

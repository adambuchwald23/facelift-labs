import { NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const MAX_FIELD_LEN = 500;
const MAX_MESSAGE_LEN = 5000;

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 503 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
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

    const safe = {
      firstName: escapeHtml(String(firstName || "").slice(0, MAX_FIELD_LEN)),
      lastName: escapeHtml(String(lastName || "").slice(0, MAX_FIELD_LEN)),
      email: escapeHtml(email),
      phone: escapeHtml(String(phone || "").slice(0, MAX_FIELD_LEN)),
      services: Array.isArray(services)
        ? services.map((s: unknown) => escapeHtml(String(s).slice(0, MAX_FIELD_LEN)))
        : [],
      message: escapeHtml(message),
    };

    const toEmail = process.env.CONTACT_TO_EMAIL || "hello@faceliftlabs.com";

    const { error } = await resend.emails.send({
      from: "Facelift Labs <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: email,
      subject: `New inquiry from ${safe.firstName} ${safe.lastName}`.trim(),
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
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

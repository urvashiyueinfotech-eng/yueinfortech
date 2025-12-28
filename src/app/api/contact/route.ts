import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { adminDb } from "@/lib/firebaseAdmin";

const emailTo = process.env.CONTACT_EMAIL_TO;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, subject, message } = body || {};

    if (!name || !email || !subject || !message || !phone) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Store in Firestore (if admin is configured)
    if (adminDb) {
      await adminDb.collection("contactSubmissions").add({
        name,
        phone,
        email,
        subject,
        message,
        createdAt: new Date().toISOString(),
      });
    }

    // Send email via SMTP
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !emailTo) {
      console.warn("SMTP not configured; skipping email send.");
    } else {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Website Contact" <${process.env.SMTP_USER}>`,
        to: emailTo,
        subject: `New contact form submission: ${subject}`,
        text: `
Name: ${name}
Phone: ${phone}
Email: ${email}
Subject: ${subject}
Message:
${message}
        `,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json({ error: "Failed to submit form." }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";

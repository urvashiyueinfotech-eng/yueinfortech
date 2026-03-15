import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import {
  CONTACT_SUBMISSIONS_COLLECTION,
  createContactSubmissionDocument,
  sanitizeContactSubmission,
} from "@/lib/contactSubmission";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const submission = sanitizeContactSubmission(body);

    if (!submission) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (!adminDb) {
      console.error("Contact form storage error: Firestore admin is not configured.");
      return NextResponse.json(
        { error: "Lead storage is not configured. Please try again later." },
        { status: 500 }
      );
    }

    await adminDb
      .collection(CONTACT_SUBMISSIONS_COLLECTION)
      .add(createContactSubmissionDocument(submission));

    return NextResponse.json({
      ok: true,
      message: "Thanks. Your request has been saved and we will get back to you shortly.",
    });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json({ error: "Failed to submit form." }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import {
  CONTACT_SUBMISSIONS_COLLECTION,
  createContactSubmissionDocument,
  sanitizeContactSubmission,
} from "@/lib/contactSubmission";

function getErrorMessage(error: unknown) {
  return error instanceof Error && error.message
    ? error.message
    : "Failed to submit form.";
}

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const submission = sanitizeContactSubmission(body);

  if (!submission) {
    return NextResponse.json(
      { error: "Please provide name, phone, email, and subject." },
      { status: 422 }
    );
  }

  if (!adminDb) {
    console.error("Contact form storage error: Firestore admin is not configured.");
    return NextResponse.json(
      { error: "Lead storage is not configured. Please try again later." },
      { status: 503 }
    );
  }

  try {
    await adminDb
      .collection(CONTACT_SUBMISSIONS_COLLECTION)
      .add(createContactSubmissionDocument(submission));

    return NextResponse.json({
      ok: true,
      message: "Thanks. Your request has been saved and we will get back to you shortly.",
    });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";

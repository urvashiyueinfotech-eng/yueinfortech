import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import admin from "firebase-admin";
import "@/lib/firebaseAdmin";

async function isAuthorized(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ") || !admin.apps.length) {
    return false;
  }

  try {
    const token = authorization.slice("Bearer ".length).trim();
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("decodedToken>>>>>",decodedToken);
    return decodedToken.admin === true;
  } catch (error) {
    console.error("Failed to verify revalidation token", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const tags: string[] = Array.isArray(body?.tags)
    ? Array.from(
        new Set(
          body.tags.filter(
            (tag: unknown): tag is string =>
              typeof tag === "string" && tag.trim().length > 0
          )
        )
      )
    : [];

  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (tags.length === 0) {
    return NextResponse.json({ error: "At least one cache tag is required." }, { status: 400 });
  }

  tags.forEach((tag) => revalidateTag(tag, "max"));

  return NextResponse.json({ revalidated: true, tags });
}

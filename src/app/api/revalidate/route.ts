import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import admin from "firebase-admin";
import "@/lib/firebaseAdmin";

const adminOrigin = process.env.ADMIN_PANEL_ORIGIN;

const normalizeOrigin = (value?: string | null) =>
  value ? value.replace(/\/$/, "") : value;

const buildCorsHeaders = (requestOrigin?: string | null) => {
  const normalizedEnvOrigin = normalizeOrigin(adminOrigin);
  const normalizedRequestOrigin = normalizeOrigin(requestOrigin);

  const allowOrigin =
    normalizedEnvOrigin === "*" || !normalizedEnvOrigin
      ? "*"
      : normalizedRequestOrigin === normalizedEnvOrigin
      ? normalizedRequestOrigin
      : normalizedEnvOrigin;

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
};

async function isAuthorized(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ") || !admin.apps.length) {
    return false;
  }

  try {
    const token = authorization.slice("Bearer ".length).trim();
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken.admin === true;
  } catch (error) {
    console.error("Failed to verify revalidation token", error);
    return false;
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: buildCorsHeaders(request.headers.get("origin")),
  });
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
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: buildCorsHeaders(request.headers.get("origin")) }
    );
  }

  if (tags.length === 0) {
    return NextResponse.json(
      { error: "At least one cache tag is required." },
      { status: 400, headers: buildCorsHeaders(request.headers.get("origin")) }
    );
  }

  tags.forEach((tag) => revalidateTag(tag, "max"));

  return NextResponse.json(
    { revalidated: true, tags },
    { headers: buildCorsHeaders(request.headers.get("origin")) }
  );
}

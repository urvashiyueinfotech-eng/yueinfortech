import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME as string;
const apiKey = process.env.CLOUDINARY_API_KEY as string;
const apiSecret = process.env.CLOUDINARY_API_SECRET as string;
const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET; // optional if unsigned preset
const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "uploads";
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
      : normalizedEnvOrigin; // fall back to env value if mismatch

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
};

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: buildCorsHeaders(req.headers.get("origin")),
  });
}

export async function POST(req: NextRequest) {
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary is not configured" },
      { status: 500, headers: buildCorsHeaders(req.headers.get("origin")) }
    );
  }

  try {
    const { filename } = await req.json();
    if (!filename) {
      return NextResponse.json(
        { error: "filename is required" },
        { status: 400, headers: buildCorsHeaders(req.headers.get("origin")) }
      );
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const publicId = `${crypto.randomUUID()}-${filename}`.replace(/\s+/g, "-");

    // Build the string to sign with keys sorted alphabetically (Cloudinary requirement)
    const signParams: Record<string, string> = {
      folder,
      public_id: publicId,
      timestamp: String(timestamp),
    };
    if (uploadPreset) {
      signParams.upload_preset = uploadPreset;
    }

    const stringToSign = Object.keys(signParams)
      .sort()
      .map((key) => `${key}=${signParams[key]}`)
      .join("&");

    const signature = crypto.createHash("sha1").update(stringToSign + apiSecret).digest("hex");

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    // Cloudinary public URL omits the folder in the path when using the default upload mapping; include folder in public_id instead.
    const fileUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;

    return NextResponse.json(
      {
        uploadUrl,
        fileUrl,
        signature,
        timestamp,
        apiKey,
        folder,
        uploadPreset: uploadPreset ?? null,
        upload_preset: uploadPreset ?? null, // convenience for clients expecting snake_case
        publicId,
        stringToSign,
      },
      { headers: buildCorsHeaders(req.headers.get("origin")) }
    );
  } catch (error) {
    console.error("Error generating Cloudinary signature", error);
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500, headers: buildCorsHeaders(req.headers.get("origin")) }
    );
  }
}

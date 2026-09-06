import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accountId = process.env.R2_ACCOUNT_ID as string;
const accessKeyId = process.env.R2_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY as string;
const bucket = process.env.R2_BUCKET_NAME as string;
const publicUrl = process.env.R2_PUBLIC_URL as string; // e.g. https://pub-xxxx.r2.dev
const folder = process.env.R2_UPLOAD_FOLDER || "uploads";
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

const getR2Client = () =>
  new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: buildCorsHeaders(req.headers.get("origin")),
  });
}

export async function POST(req: NextRequest) {
  if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicUrl) {
    return NextResponse.json(
      { error: "R2 storage is not configured" },
      { status: 500, headers: buildCorsHeaders(req.headers.get("origin")) }
    );
  }

  try {
    const { filename, contentType } = await req.json();
    if (!filename) {
      return NextResponse.json(
        { error: "filename is required" },
        { status: 400, headers: buildCorsHeaders(req.headers.get("origin")) }
      );
    }

    const safeFilename = `${crypto.randomUUID()}-${filename}`.replace(/\s+/g, "-");
    const key = `${folder}/${safeFilename}`;

    const client = getR2Client();
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType || "application/octet-stream",
    });

    const uploadUrl = await getSignedUrl(client, command, { expiresIn: 300 });
    const fileUrl = `${publicUrl.replace(/\/$/, "")}/${key}`;

    return NextResponse.json(
      { uploadUrl, fileUrl, key },
      { headers: buildCorsHeaders(req.headers.get("origin")) }
    );
  } catch (error) {
    console.error("Error generating R2 upload URL", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500, headers: buildCorsHeaders(req.headers.get("origin")) }
    );
  }
}

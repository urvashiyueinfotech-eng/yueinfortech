export type CloudinaryOptions = {
  width?: number;
  crop?: "fill" | "fit" | "scale" | "thumb";
  gravity?: string;
  quality?: string; // e.g., "auto", "auto:eco"
};

/**
 * Injects a Cloudinary transformation string into an existing Cloudinary URL.
 * Returns the original URL for non-Cloudinary sources or if already transformed.
 */
export function buildCloudinaryUrl(src: string, opts: CloudinaryOptions = {}) {
  if (!src || typeof src !== "string") return src;
  const uploadMarker = "/upload/";
  if (!src.includes("res.cloudinary.com") || !src.includes(uploadMarker)) {
    return src;
  }

  // Avoid double-transforming if f_auto already present
  const afterUpload = src.split(uploadMarker)[1] ?? "";
  if (afterUpload.startsWith("f_auto") || afterUpload.startsWith("q_auto")) {
    return src;
  }

  const { width, crop = "fill", gravity = "auto", quality = "auto" } = opts;
  const parts = [
    "f_auto",
    `q_${quality}`,
    crop ? `c_${crop}` : null,
    gravity ? `g_${gravity}` : null,
    width ? `w_${width}` : null,
  ].filter(Boolean);

  const [prefix, suffix] = src.split(uploadMarker);
  return `${prefix}${uploadMarker}${parts.join(",")}/${suffix}`;
}

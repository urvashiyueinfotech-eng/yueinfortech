import "server-only"; // Prevents this file from being bundled to the client
import { initializeApp, getApps, getApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Helper to parse the private key correctly
// (Handles the newline \n issue that often breaks Vercel/Env variables)
const serviceAccountKey = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
) as ServiceAccount;

if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccountKey),
  });
}

// Export the Admin Firestore
export const adminDb = getFirestore();
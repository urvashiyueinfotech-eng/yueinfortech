import "server-only";
import admin from "firebase-admin";

function readServiceAccount() {
  const rawServiceAccount =
    process.env.FIREBASE_SERVICE_ACCOUNT ?? process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!rawServiceAccount) {
    return null;
  }

  try {
    return JSON.parse(rawServiceAccount);
  } catch (error) {
    console.error("Failed to parse Firebase service account JSON.", error);
    return null;
  }
}

const serviceAccount = readServiceAccount();

if (!admin.apps.length && serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const adminDb = admin.apps.length ? admin.firestore() : null;

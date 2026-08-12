import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";

import { env } from "../env";

if (
  !env.FIREBASE_ADMIN_PROJECT_ID ||
  !env.FIREBASE_ADMIN_CLIENT_EMAIL ||
  !env.FIREBASE_ADMIN_PRIVATE_KEY
) {
  throw new Error("Firebase Admin credentials are not fully configured");
}

export const firebaseAdminApp =
  getApps()[0] ??
  initializeApp({
    credential: cert({
      projectId: env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });

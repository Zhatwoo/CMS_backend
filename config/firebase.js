// Firebase Admin SDK — Auth + Firestore + Realtime Database (optional)
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore, FieldValue, FieldPath } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const { getDatabase } = require('firebase-admin/database');

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;
const databaseURL = process.env.FIREBASE_DATABASE_URL || '';
const storageBucketName = process.env.FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '';

if (!projectId || !clientEmail || !privateKey) {
  throw new Error('Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY in .env');
}

if (typeof privateKey === 'string' && privateKey.includes('\\n')) {
  privateKey = privateKey.replace(/\\n/g, '\n');
}

if (getApps().length === 0) {
  const appOptions = {
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  };
  if (databaseURL) appOptions.databaseURL = databaseURL;
  if (storageBucketName.trim()) appOptions.storageBucket = storageBucketName.trim();
  initializeApp(appOptions);
}

const auth = getAuth();
const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

function getRealtimeDb() {
  if (!databaseURL) return null;
  try {
    return getDatabase();
  } catch {
    return null;
  }
}

/** Get Storage bucket for listing/deleting project files. Returns null if bucket not configured. */
function getStorageBucket() {
  if (!storageBucketName.trim()) return null;
  try {
    return getStorage().bucket(storageBucketName.trim());
  } catch {
    return null;
  }
}

/** Backward compat for modules using admin.firestore.FieldValue / FieldPath */
const admin = {
  firestore: { FieldValue, FieldPath },
};

module.exports = { admin, auth, db, getRealtimeDb, getStorageBucket };

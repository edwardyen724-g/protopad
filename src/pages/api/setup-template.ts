import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string; email: string };
}

const firebaseConfig = {
  // Ensure your Firebase service account credentials are set in environment variables.
  credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_SDK as string)),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

initializeApp(firebaseConfig);
const db = getFirestore();

const templates = {
  default: {
    framework: "React",
    code: "<h1>Hello, ProtoPad!</h1>",
  },
  // Additional templates can be added here
};

export default async function setupTemplate(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!req.user) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const { templateName } = req.body;

  try {
    const selectedTemplate = templates[templateName] || templates.default;

    const templateDoc = {
      userId: req.user.uid,
      templateName: selectedTemplate.framework,
      code: selectedTemplate.code,
      createdAt: new Date(),
    };

    await db.collection('templates').add(templateDoc);

    return res.status(201).json({ message: 'Template set up successfully', template: templateDoc });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}
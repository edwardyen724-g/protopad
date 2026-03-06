import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { verify } from 'jsonwebtoken';

const firebaseAdminConfig = {
  credential: applicationDefault(),
};

initializeApp(firebaseAdminConfig);
const db = getFirestore();

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string; email: string };
}

export default async function handler(
  req: AuthedRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = verify(token, process.env.JWT_SECRET as string);
    req.user = decodedToken as { uid: string; email: string };

    // Here you would set up the template in the Firestore database
    const { templateName, framework } = req.body;

    if (!templateName || !framework) {
      return res.status(400).json({ message: 'Template name and framework are required.' });
    }

    // Example of saving template setup to Firestore
    const setupTemplate = {
      userId: req.user.uid,
      templateName,
      framework,
      createdAt: new Date(),
    };

    await db.collection('templates').add(setupTemplate);
    return res.status(201).json({ message: 'Template setup successfully.', setupTemplate });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}
import type { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, doc, getDoc } from 'firebase-admin/firestore';
import { initializeApp, applicationDefault, getApps } from 'firebase-admin/app';

interface AuthedRequest extends NextApiRequest {
  userId?: string; // Extend the request to include userId from auth
}

const firebaseApp = !getApps().length ? initializeApp({ credential: applicationDefault() }) : getApps()[0];
const db = getFirestore(firebaseApp);

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const projectRef = doc(db, 'projects', String(id));
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const projectData = projectSnap.data();
    return res.status(200).json({ id: projectSnap.id, ...projectData });
  } catch (err) {
    console.error('Error fetching project:', err);
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}
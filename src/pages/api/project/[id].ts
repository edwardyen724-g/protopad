import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

interface AuthedRequest extends NextApiRequest {
  // Add any custom properties here
}

const projectCache = new Map<string, any>();

const fetchProjectById = async (id: string) => {
  // Simulated database call to fetch project by ID
  const project = projectCache.get(id);
  if (project) {
    return project;
  }
  throw new Error('Project not found');
};

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  const {
    method,
    query: { id },
  } = req;

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const project = await fetchProjectById(id);
    return res.status(200).json(project);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}
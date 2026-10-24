import crypto from 'crypto';
import { ResumeData } from '@/types/resume';
import {
  persistResumeRecord,
  fetchResumeRecord,
  updateResumeRecord,
  StoredResumeRecord,
} from '@/lib/serverDb';

export type { StoredResumeRecord };

export function generateSecureId(prefix = 'res'): string {
  // 128-bit unguessable random hex string (16 bytes = 32 hex chars)
  const bytes = crypto.randomBytes(16).toString('hex');
  return `${prefix}_${bytes}`;
}

export function generateAccessToken(): string {
  // 256-bit unguessable random hex string (32 bytes = 64 hex chars)
  return `tok_${crypto.randomBytes(32).toString('hex')}`;
}

export async function saveResume(
  resumeData: ResumeData,
  targetRole?: string,
  targetJobDescription?: string
): Promise<{ id: string; accessToken: string; record: StoredResumeRecord }> {
  const id = resumeData.id || generateSecureId('res');
  const accessToken = generateAccessToken();
  const now = new Date().toISOString();
  // 30 days expiration
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const record: StoredResumeRecord = {
    id,
    accessToken,
    data: {
      ...resumeData,
      id,
      createdAt: now,
      updatedAt: now,
    },
    targetRole,
    targetJobDescription,
    createdAt: now,
    updatedAt: now,
    expiresAt,
  };

  try {
    // Persist directly to Cloud Firestore database
    await persistResumeRecord(record);
  } catch (err: any) {
    // Log failure without exposing secrets or personal data
    console.error('Persistent storage error: Failed to save resume to Firestore');
    throw new Error('Database persistence failed. Resume could not be securely saved.');
  }

  return { id, accessToken, record };
}

export async function getResume(
  id: string,
  accessToken?: string
): Promise<StoredResumeRecord | null> {
  if (!id) return null;

  let record: StoredResumeRecord | null = null;
  try {
    record = await fetchResumeRecord(id);
  } catch (err: any) {
    console.error('Persistent storage error: Failed to fetch resume from Firestore');
    return null;
  }

  if (!record) return null;

  // Strict authorization validation: separate users cannot read each other's resumes
  if (accessToken && record.accessToken !== accessToken) {
    return null; // Unauthorized
  }

  return record;
}

export async function updateResume(
  id: string,
  accessToken: string,
  updates: Partial<ResumeData>,
  targetRole?: string,
  targetJobDescription?: string
): Promise<StoredResumeRecord | null> {
  const existing = await getResume(id, accessToken);
  if (!existing) return null;

  const now = new Date().toISOString();

  // Merge updates cleanly, preserving all untouched fields
  const mergedData: ResumeData = {
    ...existing.data,
    ...updates,
    personalInfo: {
      ...existing.data.personalInfo,
      ...(updates.personalInfo || {}),
    },
    education: updates.education !== undefined ? updates.education : existing.data.education,
    experience: updates.experience !== undefined ? updates.experience : existing.data.experience,
    skills: updates.skills !== undefined ? updates.skills : existing.data.skills,
    languages: updates.languages !== undefined ? updates.languages : existing.data.languages,
    projects: updates.projects !== undefined ? updates.projects : existing.data.projects,
    certifications: updates.certifications !== undefined ? updates.certifications : existing.data.certifications,
    achievements: updates.achievements !== undefined ? updates.achievements : existing.data.achievements,
    internships: updates.internships !== undefined ? updates.internships : existing.data.internships,
    volunteerExperience: updates.volunteerExperience !== undefined ? updates.volunteerExperience : existing.data.volunteerExperience,
    references: updates.references !== undefined ? updates.references : existing.data.references,
    id,
    updatedAt: now,
  };

  const updatedRecord: StoredResumeRecord = {
    ...existing,
    data: mergedData,
    targetRole: targetRole !== undefined ? targetRole : existing.targetRole,
    targetJobDescription: targetJobDescription !== undefined ? targetJobDescription : existing.targetJobDescription,
    updatedAt: now,
  };

  try {
    await updateResumeRecord(id, updatedRecord);
  } catch (err: any) {
    console.error('Persistent storage error: Failed to update resume in Firestore');
    throw new Error('Database persistence failed. Resume could not be updated.');
  }

  return updatedRecord;
}

export async function verifyAccess(id: string, accessToken: string): Promise<boolean> {
  const record = await getResume(id, accessToken);
  return !!record;
}

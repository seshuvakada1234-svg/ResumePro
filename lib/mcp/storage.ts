import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { ResumeData } from '@/types/resume';

export interface StoredResumeRecord {
  id: string;
  accessToken: string;
  data: ResumeData;
  targetRole?: string;
  targetJobDescription?: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

// In-memory cache for ultra-fast access
const resumeMemoryCache = new Map<string, StoredResumeRecord>();

// Filesystem persistence directory
const STORAGE_DIR = path.resolve(process.cwd(), '.mcp_resumes');

function ensureStorageDir(): void {
  try {
    if (!fs.existsSync(STORAGE_DIR)) {
      fs.mkdirSync(STORAGE_DIR, { recursive: true });
    }
  } catch (err) {
    console.error('Failed to create storage directory:', err);
  }
}

function getFilePath(id: string): string {
  // Prevent path traversal
  const safeId = id.replace(/[^a-zA-Z0-9_-]/g, '');
  return path.join(STORAGE_DIR, `${safeId}.json`);
}

function persistToDisk(record: StoredResumeRecord): void {
  try {
    ensureStorageDir();
    const filePath = getFilePath(record.id);
    fs.writeFileSync(filePath, JSON.stringify(record, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist resume to disk:', err);
  }
}

function readFromDisk(id: string): StoredResumeRecord | null {
  try {
    const filePath = getFilePath(id);
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(content) as StoredResumeRecord;
    
    // Check expiration (30 days)
    if (parsed.expiresAt && new Date(parsed.expiresAt).getTime() < Date.now()) {
      try { fs.unlinkSync(filePath); } catch {}
      return null;
    }
    
    return parsed;
  } catch (err) {
    console.error(`Failed to read resume ${id} from disk:`, err);
    return null;
  }
}

export function generateSecureId(prefix = 'res'): string {
  const bytes = crypto.randomBytes(8).toString('hex');
  return `${prefix}_${bytes}`;
}

export function generateAccessToken(): string {
  return `tok_${crypto.randomBytes(16).toString('hex')}`;
}

export async function saveResume(
  resumeData: ResumeData,
  targetRole?: string,
  targetJobDescription?: string
): Promise<{ id: string; accessToken: string; record: StoredResumeRecord }> {
  const id = resumeData.id || generateSecureId('res');
  const accessToken = generateAccessToken();
  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days

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

  resumeMemoryCache.set(id, record);
  persistToDisk(record);

  return { id, accessToken, record };
}

export async function getResume(
  id: string,
  accessToken?: string
): Promise<StoredResumeRecord | null> {
  if (!id) return null;

  let record = resumeMemoryCache.get(id);
  if (!record) {
    record = readFromDisk(id) || undefined;
    if (record) {
      resumeMemoryCache.set(id, record);
    }
  }

  if (!record) return null;

  // Authorization check
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

  // Merge updates cleanly, preserving untouched fields
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

  resumeMemoryCache.set(id, updatedRecord);
  persistToDisk(updatedRecord);

  return updatedRecord;
}

export function verifyAccess(id: string, accessToken: string): boolean {
  const record = resumeMemoryCache.get(id) || readFromDisk(id);
  if (!record) return false;
  return record.accessToken === accessToken;
}

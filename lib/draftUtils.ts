import { ResumeData } from '@/types/resume';
import { toast } from 'sonner';

export interface DraftWrapper {
  data: ResumeData;
  timestamp: number;
}

const STORAGE_KEY = 'resume_draft_v1';
const EXPIRY_MS = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

/**
 * Saves the current resume data to localStorage with a timestamp wrapper.
 * Handles storage quota exceeded errors gracefully by displaying a toast warning
 * and returning false.
 */
export function saveDraft(data: ResumeData): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const wrapper: DraftWrapper = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wrapper));
    return true;
  } catch (error: any) {
    console.error('Failed to save resume draft to localStorage:', error);
    
    // Check for QuotaExceededError in different browsers
    const isQuotaError = 
      error instanceof DOMException && (
        error.code === 22 ||
        error.code === 1014 ||
        error.name === 'QuotaExceededError' ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED'
      );
      
    if (isQuotaError) {
      toast.error('Local storage limit exceeded! Continuing in memory, but your draft won\'t be saved between browser sessions.');
    } else {
      toast.error('An error occurred while saving your draft.');
    }
    return false;
  }
}

/**
 * Loads the saved resume draft from localStorage.
 * Automatically deletes the draft and returns null if it is older than 30 days.
 */
export function loadDraft(): ResumeData | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const wrapper: DraftWrapper = JSON.parse(stored);
    
    // Validate schema basic structure to prevent loading corrupted data
    if (!wrapper || typeof wrapper !== 'object' || !wrapper.data || typeof wrapper.timestamp !== 'number') {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    // Check if draft is older than 30 days
    if (Date.now() - wrapper.timestamp > EXPIRY_MS) {
      console.warn('Resume draft is older than 30 days. Automatically removing.');
      clearDraft();
      return null;
    }

    return wrapper.data;
  } catch (error) {
    console.error('Failed to load resume draft from localStorage:', error);
    return null;
  }
}

/**
 * Clears the saved resume draft from localStorage.
 */
export function clearDraft(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear resume draft from localStorage:', error);
  }
}

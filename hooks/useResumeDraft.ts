import { useState, useEffect, useCallback } from 'react';
import { loadDraft, saveDraft, clearDraft } from '@/lib/draftUtils';
import { ResumeData } from '@/types/resume';

/**
 * Custom hook to detect, load, and clear resume drafts from localStorage.
 */
export function useResumeDraft() {
  const [hasDraft, setHasDraft] = useState<boolean>(false);
  const [draftData, setDraftData] = useState<ResumeData | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  const checkDraft = useCallback(() => {
    if (typeof window === 'undefined') {
      setIsChecking(false);
      return;
    }
    
    const draft = loadDraft();
    if (draft) {
      setHasDraft(true);
      setDraftData(draft);
    } else {
      setHasDraft(false);
      setDraftData(null);
    }
    setIsChecking(false);
  }, []);

  // Check draft existence on mount
  useEffect(() => {
    checkDraft();
  }, [checkDraft]);

  const removeDraft = useCallback(() => {
    clearDraft();
    setHasDraft(false);
    setDraftData(null);
  }, []);

  return {
    hasDraft,
    draftData,
    isChecking,
    checkDraft,
    removeDraft,
    saveDraft,
    loadDraft,
    clearDraft,
  };
}

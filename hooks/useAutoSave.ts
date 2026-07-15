import { useEffect, useRef, useState } from 'react';
import { saveDraft } from '@/lib/draftUtils';
import { ResumeData } from '@/types/resume';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

/**
 * Custom hook to automatically save resume data changes to localStorage with a debounce.
 * Keeps track of save status (idle, saving, saved, error) and the last saved timestamp.
 */
export function useAutoSave(data: ResumeData, delay = 500) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Track the initial data loaded so we don't save on the initial render
  const previousDataStrRef = useRef<string>('');
  const isLoadedRef = useRef<boolean>(false);

  // Initialize previousDataStrRef with the loaded data
  useEffect(() => {
    if (data && !isLoadedRef.current) {
      previousDataStrRef.current = JSON.stringify(data);
      isLoadedRef.current = true;
    }
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const currentDataStr = JSON.stringify(data);
    
    // Skip if nothing changed from what we last saved or loaded
    if (currentDataStr === previousDataStrRef.current) {
      return;
    }

    // Determine if the data is equivalent to a completely empty default resume
    const isDefault = 
      !data.personalInfo?.fullName && 
      !data.personalInfo?.email && 
      !data.personalInfo?.phone && 
      !data.personalInfo?.location && 
      !data.personalInfo?.summary && 
      (data.education?.length <= 1 && !data.education?.[0]?.school) &&
      (data.experience?.length <= 1 && !data.experience?.[0]?.company) &&
      data.skills?.length === 0 &&
      (data.projects?.length <= 1 && !data.projects?.[0]?.name);

    if (isDefault) {
      // Do not auto-save a pristine/default empty resume
      return;
    }

    // Update our reference to the current state of data
    previousDataStrRef.current = currentDataStr;

    // Clear previous timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSaveStatus('saving');

    // Debounce the save operation
    timeoutRef.current = setTimeout(() => {
      const success = saveDraft(data);
      if (success) {
        setSaveStatus('saved');
        setLastSavedTime(new Date());
      } else {
        setSaveStatus('error');
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay]);

  // Expose a function to reset the initial loaded data reference (e.g. after draft restore or fresh start)
  const resetLoadedRef = (newData: ResumeData) => {
    previousDataStrRef.current = JSON.stringify(newData);
    isLoadedRef.current = true;
    setSaveStatus('idle');
    setLastSavedTime(null);
  };

  return {
    saveStatus,
    lastSavedTime,
    resetLoadedRef,
  };
}

/**
 * Custom hook to generate auto-updating relative time text (e.g. "Last saved 2 seconds ago").
 */
export function useRelativeTime(time: Date | null): string {
  const [relativeText, setRelativeText] = useState<string>('');

  useEffect(() => {
    if (!time) {
      setRelativeText('');
      return;
    }

    const updateText = () => {
      const diffMs = Date.now() - time.getTime();
      const diffSecs = Math.floor(diffMs / 1000);
      
      if (diffSecs < 5) {
        setRelativeText('Saved');
      } else if (diffSecs < 60) {
        setRelativeText(`Last saved ${diffSecs} seconds ago`);
      } else {
        const diffMins = Math.floor(diffSecs / 60);
        if (diffMins === 1) {
          setRelativeText('Last saved 1 minute ago');
        } else {
          setRelativeText(`Last saved ${diffMins} minutes ago`);
        }
      }
    };

    updateText();
    const interval = setInterval(updateText, 1500); // Check every 1.5s to be light

    return () => clearInterval(interval);
  }, [time]);

  return relativeText;
}

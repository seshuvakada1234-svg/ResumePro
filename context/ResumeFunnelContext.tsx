"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Job {
  title: string;
  location: { display_name: string };
  salary_min?: number;
  redirect_url: string;
}

interface ResumeFunnelContextType {
  score: number | null;
  setScore: (score: number | null) => void;
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  extractedData: any;
  setExtractedData: (data: any) => void;
}

const ResumeFunnelContext = createContext<ResumeFunnelContextType | undefined>(undefined);

export function ResumeFunnelProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState<number | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [extractedData, setExtractedData] = useState<any>(null);

  return (
    <ResumeFunnelContext.Provider value={{ score, setScore, jobs, setJobs, extractedData, setExtractedData }}>
      {children}
    </ResumeFunnelContext.Provider>
  );
}

export function useResumeFunnel() {
  const context = useContext(ResumeFunnelContext);
  if (context === undefined) {
    throw new Error("useResumeFunnel must be used within a ResumeFunnelProvider");
  }
  return context;
}

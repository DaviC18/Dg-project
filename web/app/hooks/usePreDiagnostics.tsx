"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type PreDiagnostics = {
  id: string;
  formId: string;
  userId: string;
  model: string;
  created: string;
  result: {
    summary: string;
    alerts: string[];
    suggestionsToTheDoctor: string[];
    examsSuggested: string[];
    observations: string[];
  };
  form: {
    id: string;
    symptomsDescription: string;
    startDate: string;
    symptomsStatus: string;
    painLevel: number;
    hadBefore: string;
    hadBeforeWhen: string | null;
    seenByProfessional: string;
    seenByWho: string | null;
    consent: boolean;
    createdAt: string;
  };
};

export const usePreDiagnostics = () => {
  const { getToken } = useAuth();
  const [data, setData] = useState<PreDiagnostics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const token = await getToken();

        if (!token) {
          throw new Error("Usuário sem Token");
        }

        const response = await fetch("http:localhost:3333/pre-diagnostics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [getToken]);

  return { data, loading, error };
};

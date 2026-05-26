"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import type { PreDiagnostics } from "../types/preDiagnotics";

export function useForms() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [info, setInfo] = useState<PreDiagnostics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!isLoaded) return;

      if (!isSignedIn) {
        setError("Usuário não autenticado no frontend.");
        setLoading(false);
        return;
      }

      try {
        const token = await getToken();

        if (!token) {
          throw new Error("Token não encontrado.");
        }

        const response = await fetch("http://localhost:3333/forms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }

        const json = await response.json();
        setInfo(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [getToken, isLoaded, isSignedIn]);

  return { info, loading, error };
}

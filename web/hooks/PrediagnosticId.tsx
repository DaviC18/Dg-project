/** biome-ignore-all assist/source/organizeImports: <> */
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import type { PreDiagnostics } from "@/types/preDiagnotics";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export function usePreDiagnosticId(id: string) {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const [data, setData] = useState<PreDiagnostics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        if (!isLoaded) return;

        if (!isSignedIn) {
          throw new Error("Usuário não autenticado");
        }

        const token = await getToken();

        if (!token) {
          throw new Error("Token não encontrado");
        }

        const url = `${API_URL}/pre-diagnostics/${id}`;

        console.log("API_URL:", API_URL);
        console.log("FETCH URL:", url);

        const response = await fetch(url, {
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
        setError(
          err instanceof Error ? err.message : "Erro desconhecido"
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, getToken, isLoaded, isSignedIn]);

  return {
    data,
    loading,
    error,
  };
}
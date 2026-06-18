/** biome-ignore-all lint/style/noNonNullAssertion: <> */
/** biome-ignore-all assist/source/organizeImports: <> */
"use client";

import { useAuth } from "@clerk/nextjs";
import type { SymptomsStatus } from "../app/types/status";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

type SubmitState = {
  loading: boolean;
  error: string | null;
  success: string | null;
};

type ApiErrorResponse = {
  error?: string;
  message?: string;
};

type FormResponseData = {
  form?: {
    id: string;
  };
};

export function useSubmitFormToken() {
  const { getToken } = useAuth();

  const [state, setState] = useState<SubmitState>({
    loading: false,
    error: null,
    success: null,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!API_URL) {
      setState({
        loading: false,
        error: "API URL is not configured.",
        success: null,
      });
      return;
    }

    setState({
      loading: true,
      error: null,
      success: null,
    });

    try {
      const formData = new FormData(e.currentTarget);
      const token = await getToken();

      if (!token) {
        setState({
          loading: false,
          error: "User without token",
          success: null,
        });
        return;
      }

      const payload = {
        symptomsDescription: String(formData.get("symptomsDescription")),
        startDate: String(formData.get("startDate")),
        symptomsStatus: formData.get("symptomsStatus") as SymptomsStatus,
        painLevel: Number(formData.get("painLevel")),
        hadBefore: formData.get("hadBefore") === "yes",
        hadBeforeWhen: formData.get("hadBeforeWhen")
          ? String(formData.get("hadBeforeWhen"))
          : null,
        seenByProfessional: formData.get("seenByProfessional") === "yes",
        seenByWho: formData.get("seenByWho")
          ? String(formData.get("seenByWho"))
          : null,
        consent: formData.get("consent") === "on",
      };

      const formResponse = await fetch(new URL("/forms", API_URL).toString(), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const formResult = (await formResponse.json()) as FormResponseData & ApiErrorResponse;

      if (!formResponse.ok) {
        setState({
          loading: false,
          error: formResult.error ?? formResult.message ?? "Failed to create form",
          success: null,
        });
        return;
      }

      const preDiagnosticResponse = await fetch(
        new URL("/pre-diagnostics", API_URL).toString(),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formId: formResult.form?.id,
          }),
        }
      );

      const preDiagnosticResult = (await preDiagnosticResponse.json()) as ApiErrorResponse;

      if (!preDiagnosticResponse.ok) {
        setState({
          loading: false,
          error:
            preDiagnosticResult.error ??
            preDiagnosticResult.message ??
            "Failed to create pre-diagnostic",
          success: null,
        });
        return;
      }

      setState({
        loading: false,
        error: null,
        success: "Form submitted successfully.",
      });
    } catch (err) {
      setState({
        loading: false,
        error: err instanceof Error ? err.message : "Unexpected error occurred.",
        success: null,
      });
    }
  };

  return {
    handleSubmit,
    loading: state.loading,
    error: state.error,
    success: state.success,
  };
}
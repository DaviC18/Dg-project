"use client";

import { useAuth } from "@clerk/nextjs";
import { SymptomsStatus } from "../types/status";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useSubmitFormToken() {
  const { getToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const token = await getToken();

    if (!token) {
      console.error("Usuário sem token");
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

    const formResponse = await fetch(`${API_URL}forms`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const formResult = await formResponse.json();

    if (!formResponse.ok) {
      console.error("Erro ao criar formulário:", formResult);
      return;
    }

    const preDiagnosticResponse = await fetch(`${API_URL}pre-diagnostics`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formId: formResult.form.id,
      }),
    });

    const preDiagnosticResult = await preDiagnosticResponse.json();
    console.log(getToken);
    console.log("Formulário criado:", formResult);
    console.log("Pré-diagnóstico criado:", preDiagnosticResult);
  };

  return { handleSubmit };
}

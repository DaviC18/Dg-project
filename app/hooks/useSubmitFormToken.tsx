"use client";

import { useAuth } from "@clerk/nextjs";

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
      symptomsDescription: formData.get("symptomsDescription"),
      startDate: formData.get("startDate"),
      symptomsStatus: formData.get("symptomsStatus"),
      painLevel: formData.get("painLevel"),
      hadBefore: formData.get("hadBefore"),
      hadBeforeWhen: formData.get("hadBeforeWhen"),
      seenByProfessional: formData.get("seenByProfessional"),
      seenByWho: formData.get("seenByWho"),
      consent: formData.get("consent") === "on",
    };

    const response = await fetch("http://localhost:5432/protected", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Erro ao enviar formulário");
      return;
    }

    const data = await response.json();
    console.log(data);
  };

  return { handleSubmit };
}

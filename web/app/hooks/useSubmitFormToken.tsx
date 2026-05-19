"use client";

import { useAuth } from "@clerk/nextjs";

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

    const formResponse = await fetch(`${API_URL}/forms`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await formResponse.json();
    // console.log("STATUS:", formResponse.status);
    // console.log("RESPOSTA:", data);
  };

  return { handleSubmit };
}

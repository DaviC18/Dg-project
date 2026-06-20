"use client";

import { preDiagnosticId } from "@/hooks/PrediagnosticId";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = preDiagnosticId(id);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>Não encontrado.</p>;

  return (
    <main>
      <h1>{data.result.title}</h1>
      <p>{data.result.summary}</p>
      <p>{data.result.urgencyLevel}</p>
      <p>{data.result.examsSuggested}</p>
      <p>{data.result.suggestionsToTheDoctor}</p>
    </main>
  );
}
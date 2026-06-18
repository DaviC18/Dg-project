export type PreDiagnostics = {
  id: string;
  formId: string;
  userId: string;
  model: string;
  createdAt: string;
  result: {
    title: string;
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

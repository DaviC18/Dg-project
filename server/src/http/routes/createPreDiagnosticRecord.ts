// services/createPreDiagnosticRecord.ts

import { db } from "../../db/connections";
import { preDiagnostics } from "../../db/schema/preDiagnostics";
import { PreDiagnostic } from "../../services/gemini";

type Input = {
  userId: string;
  formId: string;
  model: string;
  form: any;
};

export async function createPreDiagnosticRecord({
  userId,
  formId,
  model,
  form,
}: Input) {
  const existing = await db.query.preDiagnostics.findFirst({
    where: (p, { eq }) => eq(p.formId, formId),
  });

  if (existing) {
    throw new Error("Pre diagnostic already exists");
  }

  const iaResults = await PreDiagnostic(form);

  const [preDiagnostic] = await db
    .insert(preDiagnostics)
    .values({
      userId,
      formId,
      model,
      result: iaResults,
    })
    .returning();

  return preDiagnostic;
}

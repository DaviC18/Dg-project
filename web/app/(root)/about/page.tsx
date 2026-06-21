import { steps } from "../constants";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:py-16 container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-600">
            About the project
          </p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Built to make triage faster, clearer, and more organized.
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            Doctor Genesis was designed to help clinical teams save time during
            consultations by collecting symptom data before the appointment and
            turning that information into a structured pre-diagnosis.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-semibold">Our mission</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Our mission is to make medical care more agile and accessible with
              AI, while keeping the physician in control of the final
              interpretation.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              The system is not a diagnosis engine. It is a support layer that
              helps organize information before the consultation even starts.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-semibold">Why this matters</h2>
            <ul className="mt-4 space-y-3 text-base leading-7 text-slate-600">
              <li>Less time lost gathering basic information in the office.</li>
              <li>More organized data for the medical professional.</li>
              <li>A clearer patient journey from form to consultation.</li>
              <li>A structured output that can be reviewed quickly.</li>
            </ul>
          </article>
        </div>

        <div className="mt-12">
          <h2 className="text-center text-3xl font-semibold">How it works</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <article
                key={step.title}
                className="rounded-3xl border border-slate-200 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-3xl bg-slate-950 p-8 text-white">
          <h2 className="text-2xl font-semibold">
            Final decision? Always the doctor.
          </h2>
          <p className="mt-3 max-w-3xl text-white/75">
            The IA only supports the workflow. It does not replace medical
            evaluation, clinical judgment, or the human context that no model
            can fully capture.
          </p>
        </div>
      </section>
    </main>
  );
}

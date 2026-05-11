import NavbarDesktop from "@/components/NavbarDesktop";
import NavbarMobile from "@/components/NavbarMobile";

const cards = [
  {
    title: "Input",
    text: "The patient form is sent to the backend after authentication and consent validation.",
  },
  {
    title: "Processing",
    text: "The backend looks up the form, sends the clinical data to Gemini, and waits for a structured response.",
  },
  {
    title: "Output",
    text: "The IA returns summary, alerts, suggested exams, clinical suggestions, and observations.",
  },
];

export default function IaPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <NavbarDesktop />
        <NavbarMobile />
      </header>

      <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-600">
            AI section
          </p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            A pre-diagnosis engine built to support the consultation.
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            The IA reads the patient form, identifies clinical signals, and
            returns a structured result that can help the physician save time
            and review the case faster.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {card.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-3xl bg-slate-950 p-8 text-white">
            <h2 className="text-2xl font-semibold">What the IA returns</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-cyan-300">Summary</p>
                <p className="mt-2 text-sm text-white/75">
                  Short, objective overview of the case.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-cyan-300">Alerts</p>
                <p className="mt-2 text-sm text-white/75">
                  Important signals that deserve attention.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-cyan-300">
                  Suggested exams
                </p>
                <p className="mt-2 text-sm text-white/75">
                  Initial exam ideas to guide the physician.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-cyan-300">
                  Observations
                </p>
                <p className="mt-2 text-sm text-white/75">
                  Limits, missing data, and important context.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-semibold">
              Safety and responsibility
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>The IA never replaces medical judgment.</li>
              <li>The final decision belongs to the physician.</li>
              <li>The result is only a support layer for the consultation.</li>
              <li>
                When information is missing, the AI should say so clearly.
              </li>
            </ul>

            <div className="mt-8 rounded-2xl bg-cyan-50 p-5">
              <p className="text-sm font-semibold text-cyan-700">Tip</p>
              <p className="mt-2 text-sm leading-6 text-cyan-950">
                Keep the route focused on generating and saving the result, and
                let the frontend only consume the saved pre-diagnosis.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

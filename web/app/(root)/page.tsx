import NavbarDesktop from "@/components/NavbarDesktop";
import NavbarMobile from "@/components/NavbarMobile";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-[#060b18] via-[#0b1020] to-[#060b18] text-foreground border-blue-500">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <NavbarDesktop />
        <NavbarMobile />
      </header>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:py-20">
        <div className="space-y-8">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">
            Pre-diagnosis assistant
          </p>

          <div className="space-y-5">
            <h1 className="max-w-xl text-5xl font-semibold leading-tight sm:text-6xl">
              Doctor Genesis brings speed to triage without stealing the final
              word from the doctor.
            </h1>

            <p className="max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Patients fill out a guided form, the backend sends the data to AI,
              and the system returns a structured pre-diagnosis to support the
              consultation. Clear, fast, and always under medical supervision.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-white/90"
            >
              Explore the project
            </Link>
            <Link
              href="/ia"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:border-white/50 hover:bg-white/5"
            >
              See how the IA works
            </Link>
          </div>

          <div className="grid gap-4 pt-4 sm:grid-cols-3">
            {[
              {
                title: "Structured data",
                text: "Forms arrive clean and ready for analysis.",
              },
              {
                title: "AI support",
                text: "Gemini generates a consistent pre-diagnosis.",
              },
              {
                title: "Doctor-first",
                text: "The final decision always stays with the physician.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <h2 className="font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/30">
            <Image
              src="/assets/images/dg.png"
              alt="Doctor Genesis"
              width={420}
              height={420}
              priority
              className="h-auto w-full max-w-md"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

/** biome-ignore-all assist/source/organizeImports: <> */

import Image from "next/image";
import Link from "next/link";
import DG from "../../public/dg-home.png"
import { details } from "./constants";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950 border-blue-500">
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start justify-center gap-12 px-6 py-10 lg:grid-cols-2 lg:py-10">
        <div className="space-y-8">
          <p className="text-sm uppercase max-sm:text-center tracking-[0.35em] text-cyan-500">
            Pre-diagnosis assistant
          </p>

          <div className="space-y-5">
            <h1 className="max-w-xl text-5xl font-semibold leading-tight sm:text-6xl">
              Doctor Genesis brings speed to triage without stealing the final
              word from the doctor.
            </h1>

            <p className="max-w-2xl text-base leading-7 text-black/75 sm:text-lg">
              Patients fill out a guided form, the backend sends the data to AI,
              and the system returns a structured pre-diagnosis to support the
              consultation. Clear, fast, and always under medical supervision.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="rounded-full bg-slate-950/85 px-6 py-3 text-sm font-medium text-white transition hover:bg-black/90 duration-150 ease-in"
            >
              Explore the project
            </Link>
            <Link
              href="/ia"
              className="rounded-full border border-slate-950/25 px-6 py-3 text-sm font-medium text-slate-950 transition hover:border-slate-950/50 hover:bg-slate-950/5 duration-150 ease-in"
            >
              See how the IA works
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-center items-end lg:justify-end">
          <div className="w-full flex justify-center">
            <div className="max-sm:flex  justify-center">
              <div className="rounded-4xl flex justify-center  border border-slate-950/10 bg-slate-950/5 p-6 shadow-2xl shadow-cyan-950/30">
                <Image
                  src={DG}
                  alt="Doctor Genesis"
                  width={420}
                  height={420}
                  priority
                  className="h-auto w-full max-w-md"
                />
              </div>
            </div>
          </div>
          <div className="grid sm:w-auto w-full gap-4 pt-4 sm:grid-cols-3">
            {details.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 backdrop-blur"
              >
                <h2 className="font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-950/70">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

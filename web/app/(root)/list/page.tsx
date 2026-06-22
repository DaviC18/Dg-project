/** biome-ignore-all assist/source/organizeImports: <> */
/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: <> */
"use client";

import { usePreDiagnostics } from "@/hooks/usePreDiagnostics";
import Loader from "@/components/Loader"
import Error from "@/components/Error";
import { useRouter } from "next/navigation";
import { formatDateBR } from "@/lib/time";

const ListPage = () => {
  const { data, loading, error } = usePreDiagnostics();

  const router = useRouter()

  const DataGrid = () => {
  if (data.length === 1) {
    return "grid-cols-1";
  }

  if (data.length === 2) {
    return "grid-cols-1 lg:grid-cols-2";
  }

  return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
};

  return (
    <main className="py-10 pb-32 bg-white text-slate-950">
      <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:py-16">
        <div className="space-y-8">
          <p className="text-center text-lg uppercase tracking-[0.35em] text-cyan-600">
            List of the yours pre-diagnosis most recent
          </p>
        </div>

        {loading && (
          <div className="mt-7 flex flex-col place-items-center gap-5 justify-center">
            <p className="text-xl text-slate-950 text-center font-semibold">Please wait a few seconds to access your pre-diagnosis.</p>
            <Loader />
          </div>
        )}

        {error && (
          <div className="my-5 flex w- items-center justify-center">
            <Error />
          </div>
        )}

        {!loading && !error && (
          <div className={`mt-12 grid place-items-center gap-6 ${DataGrid()} items-stretch`}>
            {data.map((el) => (
              <button
                type="button"
                onClick={() => router.push(`/pre-diagnostic/${el.id}`)}
                key={el.id}
                className={`flex relative h-full ${data.length === 1 ? "w-1/3" : "w-full"} cursor-pointer flex-col justify-start text-start rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
              >
                <h1 className="text-2xl font-semibold">{el.result.title}</h1>
                <p className="mt-4 text-base leading-7 text-slate-600 line-clamp-7">
                  {el.result.summary}
                </p>
                <p className="absolute mx-auto w-9/10 pb-3 pt-48 bottom-0 bg-linear-to-t from-slate-50 via-slate-50/85 to-transparent">Created in {formatDateBR(el.createdAt)}</p>
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default ListPage;
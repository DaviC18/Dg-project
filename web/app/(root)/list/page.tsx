"use client";

import { usePreDiagnostics } from "@/app/hooks/usePreDiagnostics";
import NavbarDesktop from "@/components/NavbarDesktop";
import NavbarMobile from "@/components/NavbarMobile";
import { Search } from "lucide-react";

const Page = () => {
  const { data, loading, error } = usePreDiagnostics();

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <NavbarDesktop />
        <NavbarMobile />
      </header>

      <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:py-16">
        <div className="space-y-8">
          <p className="text-center text-sm uppercase tracking-[0.35em] text-cyan-600">
            Search your pre-diagnosis by Date
          </p>

          <form className="flex flex-col items-center justify-center space-y-5">
            <h1 className="text-2xl font-semibold sm:text-3xl">Date</h1>

            <div className="flex items-center justify-between gap-1 rounded-full border border-slate-300 bg-slate-100">
              <input
                className="py-1 pl-3 outline-0"
                type="text"
                name="date"
                placeholder="Ex: 00/00/0000"
              />
              <button
                type="button"
                className="flex h-8 w-11 cursor-pointer items-center justify-center text-[#797d88]"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>

        {loading && (
          <div className="my-5 flex items-center justify-center">
            <h1>Carregando pré-diagnósticos...</h1>
          </div>
        )}

        {error && (
          <div className="my-5 flex items-center justify-center">
            <h1>Erro: {error}</h1>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-5">
            {data.length > 0 ? (
              data.map((el) => (
                <div key={el.id}>
                  <h1>Date: {el.form.createdAt}</h1>
                  <p>{el.result.summary}</p>
                </div>
              ))
            ) : (
              <div className="my-5 flex items-center justify-center">
                <h1>Carregando pré-diagnósticos...</h1>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Page;

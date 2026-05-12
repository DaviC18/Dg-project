"use client";

// biome-ignore assist/source/organizeImports: <>
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import UserClerkDesktop from "@/app/hooks/UserClerkDesktop";
import { useFormDiagnostic } from "@/app/hooks/FormContext";

const NavbarDesktop = () => {
  const { openForm } = useFormDiagnostic();

  return (
    <header className="w-full flex items-center">
      <nav className="w-full flex items-center justify-between max-w-360 mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="w-1/3 max-sm:w-1/2 max-sm:flex max-sm:justify-start max-sm:items-center">
          <Link href="/">
            <span className="text-3xl font-semibold text-inherit ">DG</span>
          </Link>
        </div>

        <div className="max-[640px]:hidden w-1/3 menu flex items-center justify-center">
          <ul className="flex w-62.5 justify-between items-center gap-3">
            <li className="text-inherit ">
              <Link className="w-full" href="/">
                Home
              </Link>
            </li>
            <li className="text-inherit ">
              <Link className="w-full" href="/about">
                About
              </Link>
            </li>
            <li className="text-inherit ">
              <Link className="w-full" href="/ia">
                IA
              </Link>
            </li>
          </ul>
        </div>

        <figure className="relative max-sm:w-1/2 w-1/3 flex items-center justify-end gap-2">
          <Link
            href="/list"
            className="p-2 group text-inherit rounded-full cursor-pointer transition-all duration-300 hover:bg-slate-500/25"
          >
            <Search size={23} className="" />
          </Link>
          <button
            type="button"
            onClick={openForm}
            className="p-2 max-sm:hidden group text-inherit rounded-full cursor-pointer transition-all duration-300 hover:bg-slate-500/25"
          >
            <Plus size={23} className="" />
          </button>
          <div className="max-sm:hidden">
            <UserClerkDesktop />
          </div>
        </figure>
      </nav>
    </header>
  );
};

export default NavbarDesktop;

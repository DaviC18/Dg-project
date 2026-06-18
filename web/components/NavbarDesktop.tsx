"use client";

// biome-ignore assist/source/organizeImports: <>
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import UserClerkDesktop from "@/hooks/UserClerkDesktop";
import { useFormDiagnostic } from "@/hooks/FormContext";
import { navLinks } from "@/app/(root)/constants";

const NavbarDesktop = () => {
  const { openWindow } = useFormDiagnostic();

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
            {navLinks.map((el) => (
              <li
                key={el.id}
                className="w-1/3 flex justify-center items-center text-inherit opacity-75 px-3.5 py-0.5 rounded-full hover:bg-slate-500/25 hover:opacity-100 duration-200 all ease-in"
              >
                <Link
                  className="w-full flex justify-center"
                  href={`/${el.id === "home" ? "/" : el.id}`}
                >
                  {el.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* <li className="w-1/3 flex justify-center items-center text-inherit opacity-85 px-3 py-0.5 rounded-full bg-red-500 hover:opacity-100 duration-300 all ease-in">
          <Link className="w-full flex justify-center" href="/ia">
            IA
          </Link>
        </li> */}

        <figure className="relative max-sm:w-1/2 w-1/3 flex items-center justify-end gap-2">
          <Link
            href="/list"
            className="p-2 group text-inherit opacity-75 rounded-full cursor-pointer transition-all duration-300 hover:bg-slate-500/25 hover:opacity-100"
          >
            <Search size={23} className="" />
          </Link>
          <button
            type="button"
            onClick={openWindow}
            className="p-2 max-sm:hidden group text-inherit opacity-75 rounded-full cursor-pointer transition-all duration-300 hover:bg-slate-500/25 hover:opacity-100"
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

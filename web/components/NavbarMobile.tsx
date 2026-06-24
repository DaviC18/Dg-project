"use client";

// biome-ignore assist/source/organizeImports: <>
import { BrainCircuit, Home, Library, Plus } from "lucide-react";
import UserClerkMobile from "@/hooks/UserClerkMobile";
import { useWindow } from "@/hooks/WindowContextForm";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinksMobile } from "@/app/(root)/constants";

const NavbarMobile = () => {
  const { openWindow } = useWindow();
  const pathname = usePathname()

  return (
    <div className="max-sm:flex hidden px-3 fixed z-10 bottom-3 left-0 w-full bg-cover justify-center items-center gap-2">
      <div className="w-4/5 bg-white/25 backdrop-blur-xl border border-black/20 shadow-xl py-1.5 px-2.5 text-center rounded-full text-black">
        <ul className="flex items-center justify-center gap-2">
        {navLinksMobile.map((el) => {
        const Icon = el.icon;

        const isActive =
          el.link === "/"
            ? pathname === "/"
            : pathname.startsWith(el.link);

        const shouldNotTranslate = ["home", "ia"].includes(el.id);

        return (
          <li key={el.id} className="w-1/4">
            <Link
              href={el.link}
              translate={shouldNotTranslate ? "no" : "yes"}
              className={`
                flex flex-col items-center justify-center transition
                ${isActive ? "text-[#2b7fff]" : "text-slate-950"}
              `}
            >
              <Icon size={26} strokeWidth={1.8} className={isActive ? "text-[#2b7fff]" : "text-slate-950"} />
            </Link>
          </li>
        );
      })}

      <li className="flex w-1/4 items-center justify-center">
        <UserClerkMobile />
      </li>
    </ul>
      </div>
      <div className="w-1/5">
        <button
              type="button"
              onClick={() => openWindow("form")}
              className="cursor-pointer w-full min-w-[49.6px] h-[49.6px] bg-linear-to-br from-blue-500 to-cyan-400  shadow-xl text-center rounded-full "
            >
              <div className="w-full h-full flex justify-center items-center text-white">
                <Plus size={42} />
              </div>
            </button>
      </div>
    </div>
  );
};

export default NavbarMobile;

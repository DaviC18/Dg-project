"use client";

// biome-ignore assist/source/organizeImports: <>
import { BrainCircuit, Home, Library, Plus, UserRound } from "lucide-react";
import { useSectionRefs } from "./useSectionRefs";
import type { SectionKey } from "@/app/types/sections";

const NavbarMobile = () => {
  const { scrollToSection } = useSectionRefs();

  return (
    <div className="max-sm:flex hidden fixed bottom-5 left-0 w-full bg-cover justify-center items-center gap-2">
      <div
        className="  w-4/5  \r\n        \\r\\n        \r\n        bg-white/20 \\\\r\\\\n 
        backdrop-blur-xl
        border border-black/20 s
        shadow-xl
        py-1.5
        px-2.5
        text-center
        rounded-full text-black"
      >
        <form action="" className="flex justify-center items-center gap-2">
          <label htmlFor="/" className="w-1/4">
            <div className="flex justify-center items-center">
              <input type="radio" name="action" id="home" className="sr-only" />
              <button
                type="button"
                onClick={() => scrollToSection("banner" as SectionKey)}
                className="flex cursor-pointer flex-col justify-center items-center"
              >
                <Home size={20} />
                <span className="text-sm">Home</span>
              </button>
            </div>
          </label>
          <label htmlFor="/" className="w-1/4">
            <div className="flex justify-center items-center">
              <input type="radio" name="action" id="home" className="sr-only" />
              <button
                type="button"
                onClick={() => scrollToSection("about" as SectionKey)}
                className="flex cursor-pointer flex-col justify-center items-center"
              >
                <Library size={20} />
                <span className="text-sm">About</span>
              </button>
            </div>
          </label>
          <label htmlFor="/" className="w-1/4">
            <div className="flex justify-center items-center">
              <input type="radio" name="action" id="home" className="sr-only" />
              <button
                type="button"
                onClick={() => scrollToSection("ai" as SectionKey)}
                className="flex cursor-pointer flex-col justify-center items-center"
              >
                <BrainCircuit size={20} />
                <span className="text-sm">AI</span>
              </button>
            </div>
          </label>
          <label htmlFor="/" className="w-1/4">
            <div className="flex justify-center items-center">
              <button
                type="button"
                className="cursor-pointer flex flex-col justify-center items-center"
              >
                <UserRound size={20} />
                <span className="text-center text-sm">User</span>
              </button>
            </div>
          </label>
        </form>
      </div>
      <button
        type="button"
        className="cursor-pointer w-[53.6px] h-[53.6px] bg-linear-to-br from-blue-500 to-cyan-400
        border border-black/15 
        shadow-xl
        text-center
        rounded-full text-black"
      >
        <div className="w-full h-full flex justify-center items-center text-white">
          <Plus className="flex justify-center items-center" size={30} />
        </div>
      </button>
    </div>
  );
};

export default NavbarMobile;

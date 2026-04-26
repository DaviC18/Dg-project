"use client";

// biome-ignore assist/source/organizeImports: <>
import { BrainCircuit, Home, Library, Plus } from "lucide-react";
import { useSectionRefs } from "../app/hooks/useSectionRefs";
import type { SectionKey } from "@/app/types/sections";
import UserClerkMobile from "@/app/hooks/UserClerkMobile";
import { useFormDiagnostic } from "@/app/hooks/FormContext";

const NavbarMobile = () => {
  const { scrollToSection } = useSectionRefs();
  const { openForm } = useFormDiagnostic();

  return (
    <div className="max-sm:flex hidden px-3 fixed bottom-5 left-0 w-full bg-cover justify-center items-center gap-2">
      <div className="w-full bg-white/20 backdrop-blur-xl border border-black/20 shadow-xl py-1.5 px-2.5 text-center rounded-full text-black">
        <form action="" className="flex justify-center items-center gap-2">
          <label className="w-1/4">
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

          <label className="w-1/4">
            <div className="flex justify-center items-center">
              <input
                type="radio"
                name="action"
                id="about"
                className="sr-only"
              />
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

          <label className="w-1/4">
            <div className="flex justify-center items-center">
              <button
                type="button"
                onClick={openForm}
                className="cursor-pointer w-9.5 h-9.5 bg-linear-to-br from-blue-500 to-cyan-400  shadow-xl text-center rounded-full "
              >
                <div className="w-full h-full flex justify-center items-center text-white">
                  <Plus size={28} />
                </div>
              </button>
            </div>
          </label>

          <label className="w-1/4">
            <div className="flex justify-center items-center">
              <input type="radio" name="action" id="ai" className="sr-only" />
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

          <div className="flex justify-center items-center">
            <UserClerkMobile>
              <span className="text-center text-sm">User</span>
            </UserClerkMobile>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NavbarMobile;

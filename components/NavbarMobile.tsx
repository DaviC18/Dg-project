// biome-ignore assist/source/organizeImports: <section>
import type { SectionKey } from "@/app/types/sections";
import { BrainCircuit, Home, Library, Plus, UserRound } from "lucide-react";
import Link from "next/link";

type Props = {
  scrollToSection: (key: SectionKey) => void;
};

const NavbarMobile = ({ scrollToSection }: Props) => {
  return (
    <div className="max-sm:flex hidden fixed bottom-5 left-0 w-full bg-cover justify-center items-center gap-2">
      <div
        className=" w-4/5 bg-white/50 
        backdrop-blur-lg
        border border-black/15 
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
      <div
        className=" w-[53.6px] h-[53.6px] bg-white/50 
        backdrop-blur-lg
        border border-black/15 
        shadow-xl
        text-center
        rounded-full text-black flex justify-center items-center"
      >
        <label htmlFor="/" className="">
          <div className="flex justify-center items-center">
            <button
              type="button"
              className="cursor-pointer flex flex-col justify-center items-center"
            >
              <Plus size={20} />
              <span className="text-sm">Create</span>
            </button>
          </div>
        </label>
      </div>
    </div>
  );
};

export default NavbarMobile;

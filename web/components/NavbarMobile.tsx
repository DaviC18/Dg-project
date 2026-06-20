"use client";

// biome-ignore assist/source/organizeImports: <>
import { BrainCircuit, Home, Library, Plus } from "lucide-react";
import UserClerkMobile from "@/hooks/UserClerkMobile";
import { useWindow } from "@/hooks/WindowContextForm";
import Link from "next/link";

const NavbarMobile = () => {
  const { openWindow } = useWindow();

  return (
    <div className="max-sm:flex hidden px-3 fixed z-10 bottom-5 left-0 w-full bg-cover justify-center items-center gap-2">
      <div className="w-full bg-white/25 backdrop-blur-xl border border-black/20 shadow-xl py-1.5 px-2.5 text-center rounded-full text-black">
        <ul className="flex justify-center items-center gap-2 ">
          <li className="w-1/5">
            <Link
              href="/"
              className="flex flex-col justify-center items-center"
            >
              <Home className="text-inherit" size={22} />
              <span className="text-sm text-inherit text-center">Home</span>
            </Link>
          </li>
          <li className="w-1/5">
            <Link
              href="/about"
              className="flex flex-col justify-center items-center"
            >
              <Library size={22} />
              <span className="text-sm">About</span>
            </Link>
          </li>
          <li className="w-1/5">
            <button
              type="button"
              onClick={() => openWindow("form")}
              className="cursor-pointer w-9.5 h-9.5 bg-linear-to-br from-blue-500 to-cyan-400  shadow-xl text-center rounded-full "
            >
              <div className="w-full h-full flex justify-center items-center text-white">
                <Plus size={28} />
              </div>
            </button>
          </li>
          <li className="w-1/5">
            <Link
              href="/ia"
              className="flex flex-col justify-center items-center"
            >
              <BrainCircuit />
              <span className="text-sm">IA</span>
            </Link>
          </li>
          <li className="w-1/5 flex justify-center items-center">
            <UserClerkMobile>
              <span className="text-sm">User</span>
            </UserClerkMobile>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarMobile;

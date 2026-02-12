import { Plus, Settings, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <header className=" w-full h-16 flex items-center bg-linear-to-r from-blue-500 to-cyan-300">
        <nav className="w-full flex items-center justify-between max-w-360 mx-auto px-4 sm:px-6 lg:px-8 ">
          <Link href="/" className="w-1/3">
            <Image
              src="/assets/icons/logo-nav.svg"
              alt="logo"
              width={50}
              height={50}
            />
          </Link>

          <div className="w-1/3 menu flex items-center justify-center">
            <ul className="w-3/5 flex gap-6 text-white">
              <li className="w-1/3 text-center">
                <Link href="/" className="relative inline-block no-underline">
                  Home
                </Link>
              </li>
              <li className="w-1/3 text- text-center">
                <Link href="/" className="relative inline-block no-underline">
                  Sobre
                </Link>
              </li>
              <li className="w-1/3 text- text-center">
                <Link href="/" className="relative inline-block no-underline">
                  IA
                </Link>
              </li>
            </ul>
          </div>

          <figure className="relative w-1/3 flex items-center justify-end gap-2">
            <button
              type="button"
              className="p-2 bg-white text-blue-400 rounded-full cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white"
            >
              <Plus size={20} />
            </button>
            <button
              type="button"
              className="group p-2 bg-white text-blue-400 rounded-full cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white "
            >
              <UserRound size={20} />
            </button>
            <div className="absolute  bg-linear-to-br from-blue-500 to-cyan-400 text-white  shadow-[inset_4px_4px_10px_rgba(0,0,0,0.1),inset_-4px_-4px_10px_rgba(250,250,250,0.5)] transition-all duration-200 ease-in-out rounded-sm -bottom-20 mr-5 -right-13 flex flex-col rounded-[]">
              <Link
                href="/"
                className="text-start flex justify-between px-3 text-sm font-medium border-b-2 p-1 border-white rounded-[4px_4px_0px_0px]"
              >
                Perfil
                <UserRound size={18} />
              </Link>

              <Link
                href="/"
                className="text-start flex justify-between px-3 text-sm font-medium p-1"
              >
                Config
                <Settings size={18} />
              </Link>
            </div>
          </figure>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;

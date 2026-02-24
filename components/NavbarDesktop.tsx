import { Plus, UserRound } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className=" w-full h-16 flex items-center bg-linear-to-r from-blue-500 to-cyan-300">
      <nav className="w-full flex items-center justify-between max-w-360 mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="w-1/3 max-sm:w-full max-sm:flex max-sm:justify-center max-sm:items-center">
          <Link href="/">
            <span className="text-3xl font-semibold text-white ">DG</span>
          </Link>
        </div>

        <div className="max-sm:hidden w-1/3 menu flex items-center justify-center">
          <ul className="w-3/5 flex gap-6 text-white">
            <li className="w-1/3 text-center group">
              <Link href="/" className="a relative inline-block no-underline">
                Home
              </Link>
            </li>
            <li className="w-1/3 text- text-center">
              <Link href="/" className="a relative inline-block no-underline">
                Sobre
              </Link>
            </li>
            <li className="w-1/3 text- text-center">
              <Link href="/" className="a relative inline-block no-underline">
                IA
              </Link>
            </li>
          </ul>
        </div>

        <figure className="relative max-sm:hidden w-1/3 flex items-center justify-end gap-2">
          <Link
            href="/form"
            className="p-2 bg-white text-blue-400 rounded-full cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white"
          >
            <Plus size={20} />
          </Link>
          <Link
            href=""
            className="group p-2 bg-white text-blue-400 rounded-full cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white "
          >
            <UserRound size={20} />
          </Link>
        </figure>
      </nav>
    </header>
  );
};

export default Navbar;

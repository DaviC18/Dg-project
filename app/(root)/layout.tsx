// biome-ignore assist/source/organizeImports: <component>
import NavbarDesktop from "@/components/NavbarDesktop";
import type { ReactNode } from "react";
import "../globals.css";
import NavbarMobile from "@/components/NavbarMobile";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavbarDesktop />
      <NavbarMobile />
      {children}
    </div>
  );
};

export default Layout;

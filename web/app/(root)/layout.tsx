/** biome-ignore-all assist/source/organizeImports: <> */
import { SectionRefsProvider } from "@/hooks/useSectionRefs";
import type { ReactNode } from "react";
import { WindowProvider } from "../../hooks/WindowContextForm";
import FormDiagnostic from "@/components/FormDiagnostic";
import NavbarDesktop from "@/components/NavbarDesktop";
import NavbarMobile from "@/components/NavbarMobile";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SectionRefsProvider>
      <WindowProvider>
        <FormDiagnostic />
        <NavbarDesktop />
        <NavbarMobile />
        {children}
        <Footer />
      </WindowProvider>
    </SectionRefsProvider>
  );
}
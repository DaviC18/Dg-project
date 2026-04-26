import FormDiagnostic from "@/components/FormDiagnostic";
import NavbarDesktop from "@/components/NavbarDesktop";
import NavbarMobile from "@/components/NavbarMobile";
import { SectionRefsProvider } from "@/app/hooks/useSectionRefs";
import type { ReactNode } from "react";
import { FormDiagnosticProvider } from "../hooks/FormContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SectionRefsProvider>
      <FormDiagnosticProvider>
        <NavbarDesktop />
        <NavbarMobile />
        <FormDiagnostic />
        {children}
      </FormDiagnosticProvider>
    </SectionRefsProvider>
  );
}

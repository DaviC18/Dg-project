import { SectionRefsProvider } from "@/app/hooks/useSectionRefs";
import type { ReactNode } from "react";
import { FormDiagnosticProvider } from "../hooks/FormContext";
import NavbarMobile from "@/components/NavbarMobile";
import FormDiagnostic from "@/components/FormDiagnostic";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SectionRefsProvider>
      <FormDiagnosticProvider>
        <FormDiagnostic />
        {children}
      </FormDiagnosticProvider>
    </SectionRefsProvider>
  );
}

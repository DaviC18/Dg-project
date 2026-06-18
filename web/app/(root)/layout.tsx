/** biome-ignore-all assist/source/organizeImports: <> */
import { SectionRefsProvider } from "@/hooks/useSectionRefs";
import type { ReactNode } from "react";
import { WindowProvider } from "../../hooks/WindowContext";
import FormDiagnostic from "@/components/FormDiagnostic";
import PreDiagnostic from "@/components/PreDiagnostic";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SectionRefsProvider>
      <WindowProvider>
        <FormDiagnostic />
        <PreDiagnostic />
        {children}
      </WindowProvider>
    </SectionRefsProvider>
  );
}
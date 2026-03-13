// biome-ignore assist/source/organizeImports: <>
import NavbarDesktop from "@/components/NavbarDesktop";
import NavbarMobile from "@/components/NavbarMobile";
import { SectionRefsProvider } from "@/components/useSectionRefs";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SectionRefsProvider>
          <NavbarDesktop />
          <NavbarMobile />
          {children}
        </SectionRefsProvider>
      </body>
    </html>
  );
}

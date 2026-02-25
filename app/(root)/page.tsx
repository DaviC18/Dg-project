/** biome-ignore-all lint/suspicious/noAssignInExpressions: <> */
/** biome-ignore-all lint/complexity/useLiteralKeys: <> */
"use client";

import About from "@/components/About";
import Banner from "@/components/Banner";
import Ia from "@/components/Ia";
import NavbarDesktop from "@/components/NavbarDesktop";
import NavbarMobile from "@/components/NavbarMobile";
import { useRef } from "react";
import type { SectionKey } from "../types/sections";

const page = () => {
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const headerHeight = 64;

  const scrollToSection = (key: SectionKey) => {
    const el = refs.current[key];
    if (!el) return;

    const top =
      el.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  };

  return (
    <div>
      <NavbarDesktop scrollToSection={scrollToSection} />
      <NavbarMobile scrollToSection={scrollToSection} />
      <Banner
        scrollToSection={scrollToSection}
        registerRef={(el) => (refs.current["banner"] = el)}
      />
      <About registerRef={(el) => (refs.current["about"] = el)} />
      <Ia registerRef={(el) => (refs.current["ai"] = el)} />
    </div>
  );
};

export default page;

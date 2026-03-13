"use client";

import type React from "react";
import { createContext, useCallback, useContext, useRef } from "react";
import type { SectionKey } from "@/app/types/sections";

type Ctx = {
  refs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  scrollToSection: (key: SectionKey) => void;
  registerRef: (key: SectionKey, el: HTMLElement | null) => void;
};

const SectionRefsContext = createContext<Ctx | undefined>(undefined);

export const SectionRefsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const headerHeight = 64;

  const scrollToSection = useCallback((key: SectionKey) => {
    const el = refs.current[key];
    console.log(
      "[scrollToSection] key:",
      key,
      "found:",
      !!el,
      "refs:",
      refs.current,
    );
    if (!el) {
      console.warn("scrollToSection: element not found for key:", key);
      return;
    }
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top, behavior: "smooth" });
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }, []);

  const registerRef = useCallback((key: SectionKey, el: HTMLElement | null) => {
    // apenas registre se o elemento mudar (evita sobreescrita desnecessária)
    refs.current[key] = el;
    console.log(
      "[registerRef] key:",
      key,
      "el:",
      el,
      "refs now:",
      refs.current,
    );
  }, []);

  return (
    <SectionRefsContext.Provider value={{ refs, scrollToSection, registerRef }}>
      {children}
    </SectionRefsContext.Provider>
  );
};

export const useSectionRefs = () => {
  const ctx = useContext(SectionRefsContext);
  if (!ctx)
    throw new Error("useSectionRefs must be used inside SectionRefsProvider");
  return ctx;
};

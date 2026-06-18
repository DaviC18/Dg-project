/** biome-ignore-all assist/source/organizeImports: <> */
/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type WindowContextType = {
  isOpen: boolean;
  selectedPreDiagnostic: any | null;
  openWindow: (item: any) => void;
  closeWindow: () => void;
};

const WindowContext = createContext<WindowContextType | null>(
  null,
);

export function WindowProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreDiagnostic, setSelectedPreDiagnostic] = useState<any | null>(null);

  const openWindow = (item: any) => {
    setSelectedPreDiagnostic(item);
    setIsOpen(true);
  };

  const closeWindow = () => {
    setIsOpen(false);
    setSelectedPreDiagnostic(null);
  };

  return (
    <WindowContext.Provider value={{ isOpen, openWindow, closeWindow, selectedPreDiagnostic }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindow() {
  const context = useContext(WindowContext);

  if (!context) {
    throw new Error(
      "useWindow deve ser usado dentro de Window",
    );
  }

  return context;
}

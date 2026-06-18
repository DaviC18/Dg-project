/** biome-ignore-all assist/source/organizeImports: <> */
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type WindowContextType = {
  window: boolean;
  openWindow: () => void;
  closeWindow: () => void;
};

const WindowContext = createContext<WindowContextType | null>(
  null,
);

export function FormDiagnosticProvider({ children }: { children: ReactNode }) {
  const [window, setWindow] = useState(false);

  const openWindow = () => setWindow(true);
  const closeWindow = () => setWindow(false);

  return (
    <WindowContext.Provider value={{ window, openWindow, closeWindow }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useFormDiagnostic() {
  const context = useContext(WindowContext);

  if (!context) {
    throw new Error(
      "useFormDiagnostic deve ser usado dentro de FormDiagnosticProvider",
    );
  }

  return context;
}

"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type FormDiagnosticContextType = {
  window: boolean;
  openWindow: () => void;
  closeWindow: () => void;
};

const FormDiagnosticContext = createContext<FormDiagnosticContextType | null>(
  null,
);

export function FormDiagnosticProvider({ children }: { children: ReactNode }) {
  const [window, setWindow] = useState(false);

  const openWindow = () => setWindow(true);
  const closeWindow = () => setWindow(false);

  return (
    <FormDiagnosticContext.Provider value={{ window, openWindow, closeWindow }}>
      {children}
    </FormDiagnosticContext.Provider>
  );
}

export function useFormDiagnostic() {
  const context = useContext(FormDiagnosticContext);

  if (!context) {
    throw new Error(
      "useFormDiagnostic deve ser usado dentro de FormDiagnosticProvider",
    );
  }

  return context;
}

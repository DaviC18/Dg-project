"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type FormDiagnosticContextType = {
  isOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
};

const FormDiagnosticContext = createContext<FormDiagnosticContextType | null>(
  null,
);

export function FormDiagnosticProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);

  return (
    <FormDiagnosticContext.Provider value={{ isOpen, openForm, closeForm }}>
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

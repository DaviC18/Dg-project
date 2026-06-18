import type { ButtonHTMLAttributes, ReactNode } from "react";

export type TokenKeyProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

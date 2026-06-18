"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type TokenKeyProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const Tokenkey = ({ children, className, ...props }: TokenKeyProps) => {
  return (
    <button type="submit" className={className} {...props}>
      {children}
    </button>
  );
};

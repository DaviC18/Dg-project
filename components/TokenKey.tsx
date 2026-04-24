"use client";

import { useAuth } from "@clerk/nextjs";
import type { ReactNode } from "react";

export const MyComponents = ({
  children,
  ...props
}: {
  children: ReactNode;
}) => {
  const { getToken } = useAuth();

  const fetchPrediagnostico = async () => {
    const token = await getToken();

    const response = await fetch("http://localhost:5432/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <button onClick={fetchPrediagnostico} type="button" {...props}>
      {children}
    </button>
  );
};

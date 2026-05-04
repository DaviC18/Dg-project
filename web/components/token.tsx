"use client";

import { useAuth } from "@clerk/nextjs";

export function DebugTokenButton() {
  const { getToken } = useAuth();

  const handleClick = async () => {
    const token = await getToken({ skipCache: true });
    console.log(token);
  };

  return (
    <button type="button" onClick={handleClick}>
      Mostrar token
    </button>
  );
}

/** biome-ignore-all assist/source/organizeImports: <> */
"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { UserRound } from "lucide-react";

const UserClerkDesktop = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <div className="w-9 h-9 rounded-full bg-white/20" />;
  }

  if (isSignedIn && user) {
    return (
      <div className="mt-1.5">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: { width: "36px", height: "36px" },
            },
          }}
        />
      </div>
    );
  }

  return (
    <SignInButton mode="modal">
      <button
        type="button"
        className="w-9 h-9 flex items-center w- justify-center  text-inherit rounded-full cursor-pointer transition-all duration-300 hover:bg-slate-500/25"
      >
        <UserRound size={20} />
      </button>
    </SignInButton>
  );
};

export default UserClerkDesktop;

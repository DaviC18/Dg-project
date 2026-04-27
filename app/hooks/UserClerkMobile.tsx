"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { UserRound } from "lucide-react";
import type { ReactNode } from "react";

const UserClerkMobile = ({ children }: { children: ReactNode }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex flex-col justify-center items-center">
        {children}
      </div>
    );
  }

  if (isSignedIn && user) {
    return (
      <div className="flex flex-col justify-center items-center">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: { width: "25px", height: "25px" },
            },
          }}
        />
        {children}
      </div>
    );
  } else {
    return (
      <SignInButton>
        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center bg-white text-blue-400 rounded-full cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white"
        >
          <UserRound size={20} />
          {children}
        </button>
      </SignInButton>
    );
  }
};

export default UserClerkMobile;

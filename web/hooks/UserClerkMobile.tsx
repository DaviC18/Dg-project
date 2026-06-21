"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { UserRound } from "lucide-react";
import type { ReactNode } from "react";

const UserClerkMobile = ({ children }: { children: ReactNode }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex flex-col justify-center items-center">
        <UserRound />
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
      <div className="w-9 h-9 flex flex-col items-center justify-center text-inherit rounded-full cursor-pointer transition-all duration-300 ">
        <SignInButton mode="modal">
          <div>
            <UserRound />
          </div>
        </SignInButton>
        {children}
      </div>
    );
  }
};

export default UserClerkMobile;

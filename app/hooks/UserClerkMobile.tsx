"use client";

/** biome-ignore-all assist/source/organizeImports: <> */
import { SignInButton, useClerk, useUser } from "@clerk/nextjs";
import { UserRound } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

const UserClerkMobile = ({ children }: { children: ReactNode }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const clerk = useClerk();

  if (!isLoaded) {
    return (
      <div className="flex flex-col justify-center items-center">
        {children}
      </div>
    );
  }

  if (isSignedIn && user) {
    return (
      <button
        type="button"
        onClick={() => clerk.openUserProfile()}
        className="flex flex-col justify-center items-center cursor-pointer"
      >
        {user.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt={user.fullName || "User"}
            width={33}
            height={33}
            className="rounded-full max-sm:w-5.5 max-sm:h-5.5"
          />
        ) : (
          <UserRound size={33} />
        )}
        {children}
      </button>
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

"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { UserRound } from "lucide-react";

const UserClerkMobile = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex flex-col justify-center items-center">
        <UserRound />
      </div>
    );
  }

  if (isSignedIn && user) {
    return (
      <div className="flex flex-col justify-center items-center">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: { width: "26px", height: "26px" },
            },
          }}
        />
      </div>
    );
  } else {
    return (
      <div className="w-9 h-9 flex flex-col items-center justify-center text-inherit rounded-full cursor-pointer transition-all duration-300 ">
        <SignInButton mode="modal">
          <div>
            <UserRound size={26}/>
          </div>
        </SignInButton>
      </div>
    );
  }
};

export default UserClerkMobile;

/** biome-ignore-all assist/source/organizeImports: <> */
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { UserRound } from "lucide-react";
import { useEffect, useState } from "react";

const desktop = 640;

const UserClerk = () => {
  const { isSignedIn, user } = useUser();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      setIsDesktop(window.innerWidth >= desktop);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="flex justify-center items-center">
      {isSignedIn && user ? (
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: isDesktop
                ? { width: "33px", height: "33px" }
                : { width: "25px", height: "25px" },
            },
          }}
        />
      ) : (
        <SignInButton>
          <button
            type="button"
            className="w-9 h-9 flex items-center justify-center bg-white text-blue-400 rounded-full cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white"
          >
            <UserRound size={20} />
          </button>
        </SignInButton>
      )}
    </div>
  );
};

export default UserClerk;

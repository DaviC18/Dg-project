/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: <> */
/** biome-ignore-all assist/source/organizeImports: <> */
import Image from "next/image"
import Robot from "@/public/assets/images/robot.png"
import { SignInButton, useUser } from "@clerk/nextjs";

const Error = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <main className="flex items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </main>
    );
  }

  if(!isSignedIn){
    return (
      <main className="flex items-center justify-center px-6">
        <section className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            Sign in required
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            You need to be signed in to view your pre-diagnostics.
          </p>

          <SignInButton mode="modal">
            <button
              type="button"
              className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Sign in
            </button>
          </SignInButton>
        </section>
      </main>
    )
  }

  return (
    <div className="flex">
      <div className="relative w-64 h-64">
        <Image
          src={Robot}
          alt="robot_error"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-slate-700 text-3xl font-semibold">Error</h1>
        <p className="text-center">Pre Diagnostic not found</p>
      </div>
    </div>
  )
}

export default Error

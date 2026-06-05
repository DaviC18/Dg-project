/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: <> */
import Image from "next/image"
import Robot from "@/public/assets/images/robot.png"

const Error = () => {
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

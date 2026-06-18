/** biome-ignore-all assist/source/organizeImports: <> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <> */
import { useWindow } from "@/hooks/WindowContext";
import { X } from "lucide-react";
import { useEffect } from "react";

const PreDiagnostic = () => {
  const { isOpen, closeWindow } = useWindow();

  useEffect(() => {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
  
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [isOpen]);
  
    if (!isOpen) return null;
    
  return (
    <section className="fixed overflow-auto inset-0 bg-black/60 z-30 select-none flex justify-center items-center max-lg:items-start">
        <div onClick={closeWindow} className="absolute z-40 w-full h-full"></div>
        <div className="absolute group z-50 w-3/4 px-7 pt-4 pb-7.5 max-lg:my-5 bg- rounded-2xl flex flex-col justify-between gap-5">
         <div className="w-full flex justify-end items-center">
          <button onClick={closeWindow} type="button" className="cursor-pointer">
            <X size={30} className="text-gray-700" />
          </button>
        </div>
        </div>
    </section>
  )
}

export default PreDiagnostic

"use client"

// biome-ignore assist/source/organizeImports: <>
import Image from "next/image";
import { useSectionRefs } from "../app/hooks/useSectionRefs";
import { useEffect, useRef } from "react";
import type { SectionKey } from "@/app/types/sections";

const Banner: React.FC = () => {
  const { registerRef, scrollToSection } = useSectionRefs();
  const localRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    registerRef("banner" as SectionKey, localRef.current);
    return () => registerRef("banner" as SectionKey, null);
  }, [registerRef]);

  return (
    <section
      ref={localRef}
      className="banner w-full flex items-center h-[85vh] text-white max-[840px]:flex-col-reverse max-[840px]:justify-center max-[840px]:items-center"
    >
      <div className="w-2/5 max-[840px]:w-full h-8/12 m-auto max-[840px]:m-0 flex flex-col justify-between max-[840px]:justify-center max-[840px]:items-center max-[840px]:gap-5 items-start">
        <p
          id="h1"
          className="text-8xl max-sm:text-7xl max-[840px]:text-center font-semibold"
          translate="no"
        >
          Doctor Genesis
        </p>
        <p className="w-5/6 max-[840px]:text-center">
          When the compassion of medicine meets the power of technology,
          life-saving solutions are born that transform the future.
        </p>
        <button
          type="button"
          onClick={() => scrollToSection("about" as SectionKey)}
          className="group cursor-pointer border-2 border-white py-2.5 px-7 rounded-full transition-all duration-300 hover:bg-white max-[840px]:mt-5"
        >
          <span
            className="about text-white transition-colors\r\n      
                   group-hover:bg-linear-to-r group-hover:from-blue-500 group-hover:to-[#00d3f2]
                   group-hover:bg-clip-text group-hover:text-transparent"
          >
            Learn More
          </span>
        </button>
      </div>
      <div className="w-1/2 max-[840px]:hidden flex justify-center items-center">
        <Image
          src="/assets/images/dg.png"
          alt="banner"
          width={350}
          height={350}
        />
      </div>
    </section>
  );
};

export default Banner;

import Image from "next/image";
import type { SectionKey } from "@/app/types/sections";

type Props = {
  registerRef?: (el: HTMLElement | null) => void;
  scrollToSection: (key: SectionKey) => void;
};

const Banner: React.FC<Props> = ({ registerRef, scrollToSection }) => {
  return (
    <main
      ref={(el) => registerRef?.(el)}
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
          onClick={() => scrollToSection("about")}
          className="group cursor-pointer border-2 border-white py-2.5 px-7 rounded-full transition-all duration-300 hover:bg-white max-[840px]:mt-5"
        >
          <span
            className="about text-white transition-colors
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
    </main>
  );
};

export default Banner;

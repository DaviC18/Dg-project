import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <main className="banner w-full flex items-center h-[85vh] text-white">
      <div className="w-2/5 h-8/12 m-auto flex flex-col justify-between items-start">
        <p id="h1" className="text-8xl font-semibold">
          Doctor Genesis
        </p>
        <p className="w-5/6">
          Quando a compaixão da medicina encontra o poder da tecnologia, nascem
          soluções que salvam vidas e transformam o futuro.
        </p>
        <Link
          href="/"
          className="group cursor-pointer border-2 border-white py-2.5 px-7 rounded-full transition-all duration-300 hover:bg-white"
        >
          <span
            className="about text-white transition-colors
                   group-hover:bg-linear-to-r group-hover:from-blue-500 group-hover:to-[#00d3f2]
                   group-hover:bg-clip-text group-hover:text-transparent"
          >
            Saiba Mais
          </span>
        </Link>
      </div>
      <div className="w-1/2 flex justify-center items-center">
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

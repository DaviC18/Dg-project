import Image from "next/image";

type Props = {
  registerRef?: (el: HTMLElement | null) => void;
};

const About: React.FC<Props> = ({ registerRef }) => {
  return (
    <section
      ref={(el) => registerRef?.(el)}
      className="bg-white w-full flex flex-col justify-center items-center gap-5"
    >
      <div className="w-4/5 text-black flex flex-col justify-center items-center gap-10 py-10 ">
        <h1
          className="text-6xl font-semibold bg-linear-to-b max-sm:text-center from-[#2b7fff] to-[#00d3f2]
                   bg-clip-text text-transparent"
        >
          Our Mission
        </h1>
        <p className="w-3/5 text-center font-semibold">
          Our mission is to revolutionize medical care, using intelligence
          artificial to make diagnosis more agile, accurate, accessible and
          facilitating the patient's interaction at the consultation with their
          doctor.
        </p>
        <div className="slides flex flex-col justify-center items-center gap-5">
          <h1 className="text-2xl font-semibold text-center">Steps</h1>
          <div className="flex justify-center items-center flex-wrap gap-20">
            <div className="slide flex flex-col justify-center items-center gap-3.5 w-75 p-2.5 shadow-[0_0_15px_0_rgba(0,0,0,0.5)] rounded-lg">
              <h1 className="text-xl font-semibold">1° step</h1>
              <Image
                src="/assets/images/landing-3.png"
                alt="slide"
                width={250}
                height={250}
                className="rounded"
              />
              <ul className="w-60 ml-5 font-semibold list-disc ">
                <li style={{ fontSize: "14px" }}>
                  enter CPF and Password to enter the website
                </li>
                <li style={{ fontSize: "14px" }}>
                  If not registered, it will be necessary to register
                </li>
              </ul>
            </div>
            <div className="slide flex flex-col justify-center items-center gap-3.5 w-75 p-2.5 shadow-[0_0_15px_0_rgba(0,0,0,0.5)] rounded-lg">
              <h1 className="text-xl font-semibold">2° step</h1>
              <Image
                src="/assets/images/form.png"
                alt="slide"
                width={250}
                height={250}
                className="rounded"
              />
              <ul className="w-60 ml-5 font-semibold list-disc ">
                <li style={{ fontSize: "14px" }}>
                  fill out the formulario in detail
                </li>
                <li style={{ fontSize: "14px" }}>
                  after being filled send the formulario
                </li>
              </ul>
            </div>
            <div className="slide flex flex-col justify-center items-center gap-3.5 w-75 p-2.5 shadow-[0_0_15px_0_rgba(0,0,0,0.5)] rounded-lg">
              <h1 className="text-xl font-semibold">3° step</h1>
              <Image
                src="/assets/images/result.png"
                alt="slide"
                width={250}
                height={160}
                className="rounded"
              />
              <ul className="w-60 ml-5 font-semibold list-disc ">
                <li style={{ fontSize: "14px" }}>
                  sent the formulation the AI will analyze
                </li>
                <li style={{ fontSize: "14px" }}>
                  analyzed, a pre-dignostic will be sent to the doctor
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/5 h-0.75 bg-black m-auto"></div>
    </section>
  );
};

export default About;

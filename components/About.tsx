import Image from "next/image";

const About = () => {
  return (
    <section className="bg-white w-full flex flex-col justify-center items-center gap-5">
      <div className="w-4/5 text-black flex flex-col justify-center items-center gap-10 py-10 ">
        <h1
          className="text-6xl font-semibold bg-linear-to-b from-[#2b7fff] to-[#00d3f2]
                   bg-clip-text text-transparent"
        >
          Nossa Missão
        </h1>
        <p className="w-3/5 text-center font-semibold">
          Nossa missão é revolucionar o atendimento médico, usando inteligência
          artificial para tornar o diagnóstico mais ágil, preciso, acessível e
          facilitando a interação do paciente na consulta com seu médico.
        </p>
        <div className="slides flex flex-col justify-center items-center gap-5">
          <h1 className="text-2xl font-semibold text-center">Passos</h1>
          <div className="flex justify-center items-center gap-20">
            <div className="slide flex flex-col justify-center items-center gap-3.5 w-75 p-2.5 shadow-[0_0_15px_0_rgba(0,0,0,0.5)] rounded-lg">
              <h1 className="text-xl font-semibold">1° passo</h1>
              <Image
                src="/assets/images/landing-3.png"
                alt="slide"
                width={250}
                height={250}
                className="rounded"
              />
              <ul className="w-60 ml-5 font-semibold list-disc ">
                <li style={{ fontSize: "14px" }}>
                  colocar CPF e Senha para entra no site
                </li>
                <li style={{ fontSize: "14px" }}>
                  Se não cadastrado, será necessario fazer cadastramento
                </li>
              </ul>
            </div>
            <div className="slide flex flex-col justify-center items-center gap-3.5 w-75 p-2.5 shadow-[0_0_15px_0_rgba(0,0,0,0.5)] rounded-lg">
              <h1 className="text-xl font-semibold">2° passo</h1>
              <Image
                src="/assets/images/form.png"
                alt="slide"
                width={250}
                height={250}
                className="rounded"
              />
              <ul className="w-60 ml-5 font-semibold list-disc ">
                <li style={{ fontSize: "14px" }}>
                  preencher formulario detalhadamente
                </li>
                <li style={{ fontSize: "14px" }}>
                  depois de peenchido enviar o formulario
                </li>
              </ul>
            </div>
            <div className="slide flex flex-col justify-center items-center gap-3.5 w-75 p-2.5 shadow-[0_0_15px_0_rgba(0,0,0,0.5)] rounded-lg">
              <h1 className="text-xl font-semibold">3° passo</h1>
              <Image
                src="/assets/images/result.png"
                alt="slide"
                width={250}
                height={160}
                className="rounded"
              />
              <ul className="w-60 ml-5 font-semibold list-disc ">
                <li style={{ fontSize: "14px" }}>
                  enviado o formulario a IA irá análisar
                </li>
                <li style={{ fontSize: "14px" }}>
                  depois de análisado enviará um pré-dignostico para o médico{" "}
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

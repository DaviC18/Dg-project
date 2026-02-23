import Link from "next/link";

const Page = () => {
  return (
    <div className="w-full h-screen relative bg-indigo-50 flex justify-center items-center select-none">
      <main className="w-[85vw] max-sm:w-full h-[85vh] max-sm:h-screen max-sm:rounded-none bg-linear-to-br from-blue-500 to-cyan-400 rounded-2xl text-white flex max-md:flex-col  max-md:gap-10 justify-center items-center">
        <div className="w-1/2 flex justify-center items-center">
          <span className="text-8xl text-center text-white font-semibold flex max-lg:text-7xl max-md:text-6xl max-sm:text-7xl">
            Doctor
            <br />
            Genesis
          </span>
        </div>
        <div className="w-1/2 max-sm:w-full flex flex-col gap-10 justify-center items-center">
          <div className="w-60">
            <label className="w-full flex justify-between items-center bg-white rounded-full">
              <input
                id="toggle"
                type="checkbox"
                className="sr-only peer"
                aria-label="Ativar notificações"
              />
              <span className="w-1/2 text-lg  py-0.5 font-medium text-center rounded-full bg-linear-to-br from-blue-500 to-cyan-400 text-white peer-checked:bg-none peer-checked:text-black">
                Paciente
              </span>
              <span className="w-1/2 text-lg  py-0.5 font-medium text-center rounded-full bg-transparent text-black peer-checked:bg-linear-to-br peer-checked:from-blue-500 peer-checked:to-cyan-400 peer-checked:text-white">
                Médico
              </span>
            </label>
          </div>
          <div className="w-full flex justify-center items-center">
            <form action="" className="flex flex-col gap-5">
              <div className="flex justify-between">
                <label htmlFor="" className="mr-5">
                  Email
                </label>
                <input
                  type="email"
                  name=""
                  id=""
                  className="bg-white rounded-full text-black text-[13px]  px-2.5 py-1 font-medium"
                />
              </div>
              <div className="flex justify-between">
                <label htmlFor="" className="mr-3.75">
                  Senha
                </label>
                <input
                  type="password"
                  name=""
                  id=""
                  className="bg-white rounded-full text-black text-[13px]  px-2.5 py-1 font-medium"
                />
              </div>
              <div className="flex justify-center items-center mt-3">
                <button
                  type="button"
                  className="group cursor-pointer border-2 border-white py-2.5 px-7 rounded-full transition-all duration-300 hover:bg-white"
                >
                  <span
                    className="about text-white transition-colors font-medium
                   group-hover:bg-linear-to-r group-hover:from-blue-500 group-hover:to-[#00d3f2]
                   group-hover:bg-clip-text group-hover:text-transparent"
                  >
                    Entrar
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div>
            <p className="flex max-md:flex-col text-center gap-1">
              <span>Você ainda não tem conta?</span>
              <Link href="/sing-up">
                <span className="font-medium inline-block hover:underline">
                  Registre-se
                </span>
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;

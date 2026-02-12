import Link from "next/link";

const Page = () => {
  return (
    <main className="w-full h-screen flex">
      <div className="phone w-14/20 h-screen"></div>
      <div className="w-6/20 h-screen bg-linear-to-br from-blue-500 to-cyan-400 font-semibold text-white flex flex-col justify-start items-center gap-10">
        <h1 className="text-7xl text-center pt-20">Doctor Genesis</h1>
        <div className="toggle w-3/6 flex text-black justify-between bg-white rounded-full">
          <div className="w-1/2 text-center bg-linear-to-r from-blue-500 rounded-full ml-[-0.3px] to-cyan-400 text-white">
            Paciente
          </div>
          <div className="w-1/2 text-center">Médico</div>
        </div>
        <form action="">
          <div>
            <label htmlFor="cpf">CPF</label>
            <input type="text" name="cpf" id="cpf" />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input type="text" name="password" id="password" />
          </div>
          <div>
            <button type="button">Entrar</button>
          </div>
          Você ainda não tem uma conta?{" "}
          <Link href="/sign-in">
            <span className="font-normal  hover:font-semibold">
              Registre-se
            </span>
          </Link>
        </form>
      </div>
    </main>
  );
};

export default Page;

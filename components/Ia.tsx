const Ia = () => {
  return (
    <section className="w-full flex justify-center">
      <div className="w-4/5 text-black flex flex-col justify-center items-center gap-10 py-10 ">
        <h1 className=" text-6xl font-semibold bg-linear-to-b from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Nossa IA
        </h1>
        <p className="w-4/6 text-center font-semibold ">
          Nossa IA é uma tecnologia de apoio ao diagnóstico clínico. Ela analisa
          os dados preenchidos pelos pacientes na pré-triagem e oferece ao
          médico uma análise preliminar, sugerindo hipóteses clínicas, níveis de
          urgência e exames iniciais recomendados.
        </p>
        <div className="w-full flex flex-col justify-center items-center gap-16">
          <div className="flex gap-10 max-sm:flex-col max-sm:justify-center max-sm:items-center">
            <div className="flex flex-col gap-2 w-4/5 max-sm:justify-center max-sm:items-center">
              <h1 className="text-3xl font-semibold max-sm:text-center">
                Como a IA funciona?
              </h1>
              <ul className=" w-4/5 flex flex-col gap-1 max-sm:justify-center max-sm:items-center max-sm:text-center">
                <li className="text-sm font-semibold">
                  1. Coleta de Dados: O paciente preenche o formulário com
                  sintomas, histórico médico e tempo de duração.
                </li>
                <li className="text-sm font-semibold">
                  2. Análise de Padrões Clínicos: A IA compara os dados com
                  bases médicas confiáveis e casos semelhantes.
                </li>
                <li className="text-sm font-semibold">
                  3. Geração de Insights: O sistema gera um resumo com possíveis
                  condições, urgência e recomendações iniciais.
                </li>
                <li className="text-sm font-semibold">
                  4. Apoio ao Médico: A decisão final é sempre do profissional
                  de saúde.
                </li>
              </ul>
            </div>
            <div className="h-full w-0.75 rounded-xl bg-black max-sm:h-0.75 max-sm:w-full"></div>
            <div className="w-2/5 max-sm:w-full flex flex-col gap-2.5 max-sm:justify-center max-sm:items-center">
              <h1 className="text-start text-3xl font-semibold">
                O que a IA NÃO faz?
              </h1>
              <ul className="font-semibold max-sm:text-center text-sm  w-4/5  max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
                <li>1. Não substitui o médico</li>
                <li>2. Não fornece diagnósticos fechados</li>
                <li>3. Não prescreve medicamentos</li>
                <li>4. Não acessa ou compartilha dados sem autorização</li>
              </ul>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-7">
            <h1 className="text-3xl font-semibold text-center">
              Benefícios da IA para médicos e pacientes
            </h1>
            <table className="w-4/6 max-sm:w-full">
              <thead className="border-b-2 ">
                <tr className="">
                  <th className="text-start text-lg pb-2">Para médicos</th>
                  <th className="text-start text-lg pb-2">
                    <span className="pl-2">Para pacientes</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-2 font-semibold">
                  <td className="pt-4 pb-2 text-gray-600">
                    Ganha tempo em triagens
                  </td>
                  <td className="pt-4 pb-2 text-gray-600">
                    <span className="ml-2">Atendimento mais ágil</span>
                  </td>
                </tr>
                <tr className="border-b-2 font-semibold">
                  <td className="pt-4 pb-2 text-gray-600">
                    Chega mais preparado para a consulta
                  </td>
                  <td className="pt-4 pb-2 text-gray-600">
                    <span className="ml-2">Diminui tempo de espera</span>
                  </td>
                </tr>
                <tr className="border-b-2 font-semibold">
                  <td className="pt-4 pb-2 text-gray-600">
                    Reduz risco de erros em casos repetitivos
                  </td>
                  <td className="pt-4 pb-2 text-gray-600">
                    <span className="ml-2">
                      Segurança ao ser avaliado com apoio da IA
                    </span>
                  </td>
                </tr>
                <tr className="border-b-2 font-semibold">
                  <td className="pt-4 pb-2 text-gray-600">
                    Visualiza sinais de alerta mais cedo
                  </td>
                  <td className="pt-4 pb-2 text-gray-600">
                    <span className="ml-2">Informação clara e acessível</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-semibold text-center">
              Segurança e Ética
            </h1>
            <ul className="font-semibold text-md text-center">
              <li>
                Todos os dados são tratados com criptografia e anonimização.
              </li>
              <li>
                O sistema segue diretrizes da LGPD (Lei Geral de Proteção de
                Dados).
              </li>
              <li>Nenhuma informação é usada fora da finalidade médica.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ia;

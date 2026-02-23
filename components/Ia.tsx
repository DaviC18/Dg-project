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
          <div className="flex gap-10">
            <div className="flex flex-col gap-2 w-4/5">
              <h1 className="text-3xl font-semibold">Como a IA funciona?</h1>
              <ul className="list-decimal w-4/5 flex flex-col gap-1 ml-4.5">
                <li className="text-sm font-semibold">
                  Coleta de Dados: O paciente preenche o formulário com
                  sintomas, histórico médico e tempo de duração.
                </li>
                <li className="text-sm font-semibold">
                  Análise de Padrões Clínicos: A IA compara os dados com bases
                  médicas confiáveis e casos semelhantes.
                </li>
                <li className="text-sm font-semibold">
                  Geração de Insights: O sistema gera um resumo com possíveis
                  condições, urgência e recomendações iniciais.
                </li>
                <li className="text-sm font-semibold">
                  Apoio ao Médico: A decisão final é sempre do profissional de
                  saúde.
                </li>
              </ul>
            </div>
            <div className="h-full w-0.75 rounded-xl bg-black"></div>
            <div className="w-2/5 flex flex-col gap-2.5">
              <h1 className="text-start text-3xl font-semibold">
                O que a IA NÃO faz?
              </h1>
              <ul className="font-semibold text-sm list-disc w-4/5 ml-5">
                <li>Não substitui o médico</li>
                <li>Não fornece diagnósticos fechados</li>
                <li>Não prescreve medicamentos</li>
                <li>Não acessa ou compartilha dados sem autorização</li>
              </ul>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-7">
            <h1 className="text-3xl font-semibold">
              Benefícios da IA para médicos e pacientes
            </h1>
            <table className="w-4/6">
              <thead className="border-b-2 ">
                <tr className="">
                  <th className="text-start text-lg pb-2">Para médicos</th>
                  <th className="text-start text-lg pb-2">Para pacientes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-2 font-semibold">
                  <td className="pt-4 pb-2 text-gray-600">
                    Ganha tempo em triagens
                  </td>
                  <td className="pt-4 pb-2 text-gray-600">
                    Atendimento mais ágil
                  </td>
                </tr>
                <tr className="border-b-2 font-semibold">
                  <td className="pt-4 pb-2 text-gray-600">
                    Chega mais preparado para a consulta
                  </td>
                  <td className="pt-4 pb-2 text-gray-600">
                    Diminui tempo de espera
                  </td>
                </tr>
                <tr className="border-b-2 font-semibold">
                  <td className="pt-4 pb-2 text-gray-600">
                    Reduz risco de erros em casos repetitivos
                  </td>
                  <td className="pt-4 pb-2 text-gray-600">
                    Segurança ao ser avaliado com apoio da IA
                  </td>
                </tr>
                <tr className="border-b-2 font-semibold">
                  <td className="pt-4 pb-2 text-gray-600">
                    Visualiza sinais de alerta mais cedo
                  </td>
                  <td className="pt-4 pb-2 text-gray-600">
                    Informação clara e acessível
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

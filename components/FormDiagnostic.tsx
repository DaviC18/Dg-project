"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { Tokenkey } from "../app/hooks/TokenKey";
import { useSubmitFormToken } from "@/app/hooks/useSubmitFormToken";
import { useFormDiagnostic } from "@/app/hooks/FormContext";

const FormDiagnostic = () => {
  const { handleSubmit } = useSubmitFormToken();
  const { isOpen, closeForm } = useFormDiagnostic();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <section
      onClick={closeForm}
      className="fixed overflow-auto inset-0 z-50 bg-black/60 select-none flex justify-center items-center"
    >
      <div className="w-3/4 px-7 pt-4 pb-7.5 max-md:h-screen bg-[#f4f4f4] rounded-2xl flex flex-col justify-between gap-5">
        <div className="w-full flex justify-end items-center">
          <button onClick={closeForm} type="button" className="cursor-pointer">
            <X size={30} className="text-gray-700" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="content flex justify-between gap-15 max-lg:flex-col">
            <div className="left w-1/2">
              <div className="w-full flex flex-col gap-10">
                <div>
                  <h1 className="font-semibold">
                    Descreva o que você está sentindo:
                  </h1>
                  <textarea
                    name="symptomsDescription"
                    id="symptomsDescription"
                    className="resize-none w-full mt-2 h-24 p-3 text-sm border-[3px] border-gray-500 hover:border-gray-950 focus:border-black outline-0 rounded"
                  ></textarea>
                </div>
                <div>
                  <h1 className="font-semibold">
                    Quando os sintomas começaram?
                  </h1>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    className="border-[3px] cursor-pointer mt-2 px-3 py-0.5 border-gray-500 hover:border-gray-950 focus:border-black outline-0 rounded"
                  />
                </div>
                <div>
                  <h1 className="font-semibold">
                    Os sintomas pioraram, melhoraram ou estão iguais desde que
                    começaram?
                  </h1>
                  <div className="w-full flex justify-around mt-2">
                    <div className="flex items-center">
                      <input
                        className="cursor-pointer"
                        type="radio"
                        name="symptomsStatus"
                        id="symptomsStatusWorse"
                        value="worse"
                      />
                      <span className="pl-2">Pioraram</span>
                    </div>
                    <div className="flex items-center">
                      <input
                        className="cursor-pointer"
                        type="radio"
                        name="symptomsStatus"
                        id="symptomsStatusBetter"
                        value="better"
                      />
                      <span className="pl-2">Melhoraram</span>
                    </div>
                    <div className="flex items-center">
                      <input
                        className="cursor-pointer"
                        type="radio"
                        name="symptomsStatus"
                        id="symptomsStatusSame"
                        value="same"
                      />
                      <span className="pl-2">Estão iguais</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="font-semibold">
                    De 0 a 10, qual o nível da sua dor ou desconforto?
                  </h1>
                  <input
                    min="0"
                    max="10"
                    type="number"
                    name="painLevel"
                    id="painLevel"
                    className="w-50 border-[3px] mt-2 px-3 py-0.5 border-gray-500 hover:border-gray-950 focus:border-black outline-0 rounded"
                  />
                </div>
              </div>
            </div>
            <div className="w-0.5 my-4 bg-black/50" />
            <div className="right w-1/2">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold">
                    Já teve esse problema antes?
                  </h1>
                  <div className="flex gap-5">
                    <div>
                      <input
                        type="radio"
                        name="hadBeforeWhen"
                        id="hadBeforeWhenYes"
                        className="cursor-pointer"
                        value="yes"
                      />
                      <span className="pl-2">Sim</span>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="hadBeforeWhen"
                        id="hadBeforeWhen"
                        className="cursor-pointer"
                        value="no"
                      />
                      <span className="pl-2">Não</span>
                    </div>
                  </div>
                  <div className="flex gap-5 items-center">
                    <span>Se sim, quando?</span>
                    <input
                      type="date"
                      name="hadBeforeWhen"
                      id="hadBeforeWhen"
                      className="px-3 py-0.5 border-[3px] border-gray-500 hover:border-gray-950 focus:border-black outline-0 rounded"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold">
                    Já foi atendido por outro profissional sobre isso{" "}
                  </h1>
                  <div className="flex gap-5">
                    <div>
                      <input
                        className="cursor-pointer"
                        type="radio"
                        name="seenByProfessional"
                        id="seenByProfessionalYes"
                        value="yes"
                      />
                      <span className="pl-2">Sim</span>
                    </div>
                    <div>
                      <input
                        className="cursor-pointer"
                        type="radio"
                        name="seenByProfessional"
                        id="seenByProfessionalNo"
                        value="no"
                      />
                      <span className="pl-2">Não</span>
                    </div>
                  </div>
                  <div className="flex gap-5 items-center">
                    <span>Se sim, onde e quem?</span>
                    <input
                      type="text"
                      placeholder="Ex:RJ, Dr. ####"
                      name="seenByWho"
                      id="seenByWho"
                      className="px-3 py-0.5 border-[3px] border-gray-500 hover:border-gray-950 focus:border-black outline-0 rounded"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold">Permissões e Assinatura</h1>
                  <div className="flex w-9/10 gap-5">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      name="consent"
                      id="consent"
                    />
                    <div>
                      <span>
                        Autorizo o uso dos meus dados para fins de análise
                        médica e diagnóstico assistido por IA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-10">
                <Tokenkey
                  type="submit"
                  className="cursor-pointer w-32 border-[2.5px] py-2 flex justify-center items-center rounded-full border-black text-md font-semibold hover:bg-black hover:text-white ease duration-300 transition-all"
                >
                  Enviar
                </Tokenkey>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormDiagnostic;

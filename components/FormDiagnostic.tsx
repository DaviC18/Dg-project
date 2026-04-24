"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

const FormDiagnostic = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <section className="fixed inset-0 z-50 bg-black/60 select-none flex justify-center items-center">
      <div className="w-3/4 px-7 pt-4 pb-7.5 bg-[#f4f4f4] rounded-2xl flex flex-col justify-between gap-5">
        <div className="w-full flex justify-end items-center">
          <button type="button" className="cursor-pointer">
            <X size={30} className="text-gray-700" />
          </button>
        </div>
        <div className="content flex justify-between gap-15">
          <div className="left w-1/2">
            <form className="w-full flex flex-col gap-10">
              <div>
                <h1 className="font-semibold">
                  Descreva o que você está sentindo:
                </h1>
                <textarea
                  name=""
                  id=""
                  className="resize-none w-full mt-2 h-24 p-3 text-sm border-[3px] border-gray-500 hover:border-gray-950 focus:border-black outline-0 rounded"
                ></textarea>
              </div>
              <div>
                <h1 className="font-semibold">Quando os sintomas começaram?</h1>
                <input
                  type="date"
                  name=""
                  id="date"
                  className="border-[3px] mt-2 px-3 py-0.5 border-gray-500 hover:border-gray-950 focus:border-black outline-0 rounded"
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
                      type="radio"
                      name="radio_1"
                      id="radio"
                      value="worse"
                    />
                    <span className="pl-2">Pioraram</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="radio_1"
                      id="radio"
                      value="better"
                    />
                    <span className="pl-2">Melhoraram</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="radio_1"
                      id="radio"
                      value="same_thing"
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
                  name=""
                  id=""
                  className="w-50 border-[3px] mt-2 px-3 py-0.5 border-gray-500 hover:border-gray-950 focus:border-black outline-0 rounded"
                />
              </div>
            </form>
          </div>
          <div className="w-0.5 my-4 bg-black/50" />
          <div className="right w-1/2">
            <form action="" className="flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Já teve esse problema antes?</h1>
                <div className="flex gap-5">
                  <div className="">
                    <input type="radio" name="radio_2" id="" value="yes" />
                    <span className="pl-2">Sim</span>
                  </div>
                  <div className="">
                    <input type="radio" name="radio_2" id="" value="no" />
                    <span className="pl-2">Não</span>
                  </div>
                </div>
                <div className="flex gap-5 items-center">
                  <span>Se sim, quando?</span>
                  <input
                    type="date"
                    name="text"
                    id=""
                    className="px-3 py-0.5 border-[3px] border-gray-500 hover:border-gray-950 focus:border-black outline-0 rounded"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">
                  Já foi atendido por outro profissional sobre isso{" "}
                </h1>
                <div className="flex gap-5">
                  <div className="">
                    <input type="radio" name="radio_2" id="" value="yes" />
                    <span className="pl-2">Sim</span>
                  </div>
                  <div className="">
                    <input type="radio" name="radio_2" id="" value="no" />
                    <span className="pl-2">Não</span>
                  </div>
                </div>
                <div className="flex gap-5 items-center">
                  <span>Se sim, onde e quem?</span>
                  <input
                    type="text"
                    placeholder="Ex:RJ, Dr. ####"
                    name="text"
                    id=""
                    className="px-3 py-0.5 border-[3px] border-gray-500 hover:border-gray-950 focus:border-black outline-0 rounded"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormDiagnostic;

/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <> */
/** biome-ignore-all assist/source/organizeImports: <> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <> */
"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { Tokenkey } from "../hooks/TokenKey";
import { useSubmitFormToken } from "@/hooks/useSubmitFormToken";
import { useWindow } from "@/hooks/WindowContext";

const FormDiagnostic = () => {
  const { handleSubmit, loading, error, success } = useSubmitFormToken();
  const { activeWindow, closeWindow } = useWindow();

  useEffect(() => {
    document.body.style.overflow = activeWindow ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeWindow]);

  if (!activeWindow) return null;

  return (
    <section className="fixed overflow-auto inset-0 bg-black/60 z-30 select-none flex justify-center items-center max-lg:items-start">
      <div onClick={closeWindow} className="absolute z-40 w-full h-full" />

      <div className="absolute group z-50 w-3/4 px-7 pt-4 pb-7.5 max-lg:my-5 bg-[#f4f4f4] rounded-2xl flex flex-col justify-between gap-5">
        <div className="w-full flex justify-end items-center">
          <button onClick={closeWindow} type="button" className="cursor-pointer">
            <X size={30} className="text-gray-700" />
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800"
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="content flex justify-between gap-15 max-lg:flex-col">
            <div className="left w-1/2 max-lg:w-full">
              <div className="w-full flex flex-col gap-10">
                <div>
                  <h1 className="font-semibold max-lg:text-center">
                    Describe what you are feeling:
                  </h1>
                  <textarea
                    required
                    name="symptomsDescription"
                    id="symptomsDescription"
                    className="resize-none w-full mt-2 h-24 p-3 text-sm border-[3px] border-gray-500 hover:border-gray-950 focus:border-black outline-0 rounded"
                    disabled={loading}
                  />
                </div>

                <div className="flex flex-col max-lg:justify-center max-lg:items-center">
                  <h1 className="font-semibold max-lg:text-center">
                    When did the symptoms start?
                  </h1>
                  <input
                    required
                    type="date"
                    name="startDate"
                    id="startDate"
                    className="border-[3px] cursor-pointer mt-2 px-3 py-0.5 border-gray-500 hover:border-gray-950 focus:border-black outline-0 rounded"
                    disabled={loading}
                  />
                </div>

                <div className="flex flex-col max-lg:justify-center max-lg:items-center">
                  <h1 className="font-semibold max-lg:text-center">
                    Have the symptoms worsened, improved, or stayed the same
                    since they started?
                  </h1>

                  <div className="w-full flex justify-around max-sm:flex-col max-lg:items-center mt-2">
                    <div className="flex items-center">
                      <input
                        className="cursor-pointer"
                        type="radio"
                        name="symptomsStatus"
                        id="symptomsStatusWorse"
                        value="worse"
                        disabled={loading}
                      />
                      <span className="pl-2">Worse</span>
                    </div>

                    <div className="flex items-center">
                      <input
                        className="cursor-pointer"
                        type="radio"
                        name="symptomsStatus"
                        id="symptomsStatusBetter"
                        value="better"
                        disabled={loading}
                      />
                      <span className="pl-2">Better</span>
                    </div>

                    <div className="flex items-center">
                      <input
                        className="cursor-pointer"
                        type="radio"
                        name="symptomsStatus"
                        id="symptomsStatusSame"
                        value="same"
                        disabled={loading}
                      />
                      <span className="pl-2">Same Thing</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col max-lg:justify-center max-lg:items-center">
                  <h1 className="font-semibold max-lg:text-center">
                    On a scale of 0 to 10, how much pain or discomfort would you
                    experience?
                  </h1>
                  <input
                    min="0"
                    max="10"
                    type="number"
                    name="painLevel"
                    id="painLevel"
                    className="w-50 border-[3px] mt-2 px-3 py-0.5 border-gray-500 hover:border-gray-950 focus:border-black outline-0 rounded"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <div className="w-0.5 my-4 bg-black/50 max-lg:hidden" />

            <div className="right w-1/2 max-lg:w-full">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col max-lg:justify-center max-lg:items-center gap-2">
                  <h1 className="font-semibold max-lg:text-center">
                    Have you had this problem before?
                  </h1>

                  <div className="flex gap-5">
                    <div>
                      <input
                        type="radio"
                        name="hadBefore"
                        id="hadBeforeYes"
                        className="cursor-pointer"
                        value="yes"
                        disabled={loading}
                      />
                      <span className="pl-2">Yes</span>
                    </div>

                    <div>
                      <input
                        type="radio"
                        name="hadBefore"
                        id="hadBeforeNo"
                        className="cursor-pointer"
                        value="no"
                        disabled={loading}
                      />
                      <span className="pl-2">No</span>
                    </div>
                  </div>

                  <div className="flex max-lg:flex-col gap-5 max-lg:gap-2 items-center">
                    <span>If so, when?</span>
                    <input
                      type="date"
                      name="hadBeforeWhen"
                      id="hadBeforeWhen"
                      className="px-3 py-0.5 border-[3px] border-gray-500 hover:border-gray-950 focus:border-black outline-0 rounded"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="flex flex-col max-lg:justify-center max-lg:items-center gap-2">
                  <h1 className="font-semibold max-lg:text-center">
                    Have you already been advised by another healthcare
                    professional about this?
                  </h1>

                  <div className="flex gap-5">
                    <div>
                      <input
                        className="cursor-pointer"
                        type="radio"
                        name="seenByProfessional"
                        id="seenByProfessionalYes"
                        value="yes"
                        disabled={loading}
                      />
                      <span className="pl-2">Yes</span>
                    </div>

                    <div>
                      <input
                        className="cursor-pointer"
                        type="radio"
                        name="seenByProfessional"
                        id="seenByProfessionalNo"
                        value="no"
                        disabled={loading}
                      />
                      <span className="pl-2">No</span>
                    </div>
                  </div>

                  <div className="flex max-lg:flex-col gap-5 max-lg:gap-2 items-center">
                    <span>If so, where and who?</span>
                    <input
                      type="text"
                      placeholder="Ex:RJ, Dr. ####"
                      name="seenByWho"
                      id="seenByWho"
                      className="px-3 py-0.5 border-[3px] border-gray-500 hover:border-gray-950 focus:border-black outline-0 rounded"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="flex flex-col max-lg:justify-center max-lg:items-center gap-2">
                  <h1 className="font-semibold max-lg:text-center">
                    Permissions and Signature
                  </h1>

                  <div className="flex max-lg:justify-center w-9/10 max-lg:w-5/10 gap-5">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      name="consent"
                      id="consent"
                      required
                      disabled={loading}
                    />
                    <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
                      <strong>Attention:</strong> This analysis is preliminary and does not replace a medical evaluation.
If you experience shortness of breath, severe pain, fainting, or significant worsening, seek medical attention immediately.
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end max-lg:justify-center mt-10">
                <Tokenkey
                  type="submit"
                  className="cursor-pointer w-32 max-lg:w-48 border-[2.5px] py-2 flex justify-center items-center rounded-full border-black text-md font-semibold hover:bg-black hover:text-white ease duration-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
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
type Props = {
  registerRef?: (el: HTMLElement | null) => void;
};

const Ia: React.FC<Props> = ({ registerRef }) => {
  return (
    <section
      ref={(el) => registerRef?.(el)}
      className="w-full flex justify-center"
    >
      <div className="w-4/5 text-black flex flex-col justify-center items-center gap-10 py-10 ">
        <h1 className=" text-6xl font-semibold bg-linear-to-b from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Our AI
        </h1>
        <p className="w-4/6 text-center font-semibold ">
          Our AI is a technology to support clinical diagnosis. She analyzes the
          data completed by patients in pre-screening and offers the physician a
          preliminary analysis, suggesting clinical hypotheses, levels of
          urgency and recommended initial examinations.
        </p>
        <div className="w-full flex flex-col justify-center items-center gap-16">
          <div className="flex gap-10 max-sm:flex-col max-sm:justify-center max-sm:items-center">
            <div className="flex flex-col gap-2 w-4/5 max-sm:justify-center max-sm:items-center">
              <h1 className="text-3xl font-semibold max-sm:text-center">
                How does AI work?
              </h1>
              <ul className=" w-4/5 flex flex-col gap-1 max-sm:justify-center max-sm:items-center max-sm:text-center">
                <li className="text-sm font-semibold">
                  1. Data Collection: The patient fills out the form with
                  symptoms, medical history and duration.
                </li>
                <li className="text-sm font-semibold">
                  2. Clinical Pattern Analysis: AI compares data with reliable
                  medical bases and similar cases.
                </li>
                <li className="text-sm font-semibold">
                  3. Generation of Insights: The system generates a summary with
                  possible conditions, urgency and initial recommendations.
                </li>
                <li className="text-sm font-semibold">
                  4. Doctor Support: The final decision is always up to the
                  professional health.
                </li>
              </ul>
            </div>
            <div className="h-full w-0.75 rounded-xl bg-black max-sm:h-0.75 max-sm:w-full"></div>
            <div className="w-2/5 max-sm:w-full flex flex-col gap-2.5 max-sm:justify-center max-sm:items-center">
              <h1 className="text-start text-3xl font-semibold">
                What does AI NOT do?
              </h1>
              <ul className="font-semibold max-sm:text-center text-sm  w-4/5  max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
                <li>1. It does not replace the doctor</li>
                <li>2. Does not provide closed diagnoses</li>
                <li>3. Does not prescribe medications</li>
                <li>4. Does not access or share data without authorization</li>
              </ul>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-7">
            <h1 className="text-3xl font-semibold text-center">
              Benefits of AI for Doctors and Patients
            </h1>
            <table className="w-4/6 max-sm:w-full">
              <thead className="border-b-2 ">
                <tr className="">
                  <th className="text-start text-lg pb-2">For doctors</th>
                  <th className="text-start text-lg pb-2">
                    <span className="pl-2">For patients</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-2 font-semibold">
                  <td className="pt-4 pb-2 text-gray-600">
                    Ganha tempo em triagens
                  </td>
                  <td className="pt-4 pb-2 text-gray-600">
                    <span className="ml-2">More agile service</span>
                  </td>
                </tr>
                <tr className="border-b-2 font-semibold">
                  <td className="pt-4 pb-2 text-gray-600">
                    Arrives more prepared for the consultation
                  </td>
                  <td className="pt-4 pb-2 text-gray-600">
                    <span className="ml-2">Reduces waiting time</span>
                  </td>
                </tr>
                <tr className="border-b-2 font-semibold">
                  <td className="pt-4 pb-2 text-gray-600">
                    Reduces risk of errors in repetitive cases
                  </td>
                  <td className="pt-4 pb-2 text-gray-600">
                    <span className="ml-2">
                      Safety when being assessed with AI support
                    </span>
                  </td>
                </tr>
                <tr className="border-b-2 font-semibold">
                  <td className="pt-4 pb-2 text-gray-600">
                    Visualizes warning signs earlier
                  </td>
                  <td className="pt-4 pb-2 text-gray-600">
                    <span className="ml-2">
                      Clear and accessible information
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-semibold text-center">
              Security and Ethics
            </h1>
            <ul className="font-semibold text-md text-center">
              <li>
                • All data is processed with encryption and anonymization.
              </li>
              <li>
                • The system follows guidelines from the LGPD (General Law for
                the Protection of Data).
              </li>
              <li>• No information is used outside of medical purposes.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ia;

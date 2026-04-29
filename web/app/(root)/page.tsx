/** biome-ignore-all lint/suspicious/noAssignInExpressions: <> */
/** biome-ignore-all lint/complexity/useLiteralKeys: <> */
"use client";

import About from "@/components/About";
import Banner from "@/components/Banner";
import Ia from "@/components/Ia";

const page = () => {
  return (
    <div>
      <Banner />
      <About />
      <Ia />
    </div>
  );
};

export default page;

const Loader = () => {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="h-5 w-5 rounded-full bg-[#121519] mr-2.5 animate-dot-pulse [animation-delay:-0.3s]" />
      <div className="h-5 w-5 rounded-full bg-[#121519] mr-2.5 animate-dot-pulse [animation-delay:-0.1s]" />
      <div className="h-5 w-5 rounded-full bg-[#121519] mr-2.5 animate-dot-pulse [animation-delay:0.1s]" />
      <div className="h-5 w-5 rounded-full bg-[#121519] mr-2.5 animate-dot-pulse" />
      <div className="h-5 w-5 rounded-full bg-[#121519] animate-dot-pulse" />
    </section>
  );
};

export default Loader;
import type { FC } from "react";

const IndexPage: FC = () => {
  return (
    <div className="min-h-screen text-white">
      <div className="h-[800px] text-center relative p-8">
        <img
          src="/assets/images/logo.svg"
          alt="hww logo"
          className="h-[32px]"
        />
        <div className="h-full flex flex-col items-center justify-center z-0">
          <div className="absolute top-0 bottom-0 left-0 right-0 -z-10">
            <img
              src="/assets/images/hero.jpg"
              alt="Hero"
              className="h-full w-full object-cover"
            />
            <div className="h-full w-full bg-black bg-opacity-60 absolute top-0 bottom-0 left-0 right-0"></div>
          </div>
          <h1 className="text-6xl font-black">
            Coding interviews are <span className="text-primary">broken</span>
          </h1>
          <p className="text-3xl mt-12 w-2/3 mx-auto leading-relaxed">
            <span className="font-bold underline text-primary decoration-primary underline-offset-8">
              Hiring without whiteboards
            </span>{" "}
            provides a list of companies (or teams) that don't do "whiteboard"
            interviews.
          </p>
          <div className="mt-12 flex items-center gap-8 justify-center">
            <button className="text-lg px-6 py-2 rounded-md border-white border-2 font-medium hover:bg-white hover:text-black transition-all">
              Learn more
            </button>
            <button className="text-lg px-6 py-2 rounded-md border-primary text-primary border-2 font-bold hover:bg-primary hover:text-black transition-all">
              View jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;

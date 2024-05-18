import upperMotive from "../assets/upperMotive.png";
import lowerMotive from "../assets/lowerMotive.png";
import topLeaves from "../assets/topLeaves.png";
import lowerLeaves from "../assets/lowerLeaves.png";
import hero from "../assets/hero.jpg";
import Countdown from "./CountDown";

export default function Hero() {
  return (
    <>
      <div id="hero" className="hidden md:block bg-white py-12">
        <img
          className="absolute top-24 right-0 h-[320px] 2xl:h-[420px]"
          src={topLeaves}
          alt="topLeaves"
        />
        <div className="container mx-auto pb-48 px-24 2xl:px-0">
          <div className="flex">
            <div className="flex flex-col gap-4 2xl:gap-8 mx-auto pt-24 w-2/3">
              <div className="mb-12">
                <img src={upperMotive} width={"350rem"} alt="upperMotive" />
              </div>
              <h1 className="font-alex-brush text-7xl 2xl:text-9xl text-custom-pink">
                Démi & Norbi
              </h1>
              <h2 className="font-gilda text-2xl 2xl:text-3xl text-gray-600">
                ÖSSZEHÁZASODUNK, 2025. MÁJUS 31-ÉN
              </h2>
              <Countdown />
              <div className="2xl:mt-12">
                <img src={lowerMotive} width={"350rem"} alt="lowerMotive" />
              </div>
            </div>
            <div className="flex flex-col mx-auto pt-12 relative">
              <div className="z-10 rounded-t-full rounded-b-full overflow-hidden border-[1.5rem] border-y-full border-zinc-50 shadow-xl">
                <img
                  className="w-[350px] 2xl:w-[450px] object-cover"
                  src={hero}
                  alt="hero"
                />
              </div>
              <img
                className="absolute top-[25rem] right-[10rem] 2xl:top-[33rem] 2xl:right-[12rem] h-72 2xl:h-96"
                src={lowerLeaves}
                alt="lowerLeaves"
              />
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div id="hero" className="md:hidden bg-white py-2">
        <div className="container mx-auto pb-28">
          <div className="flex flex-col">
            <div className="flex flex-col gap-4 2xl:gap-8 mx-auto px-1 pt-24">
              <div className="flex justify-center">
                <img src={upperMotive} width={"350rem"} alt="upperMotive" />
              </div>
              <h1 className="font-gilda text-5xl text-center text-custom-pink">
                DÉMI & NORBI
              </h1>
              <h2 className="font-gilda text-md text-center text-gray-600">
                ÖSSZEHÁZASODUNK, 2025. MÁJUS 31-ÉN
              </h2>
              <Countdown />
              <div className="flex justify-center">
                <img src={lowerMotive} width={"350rem"} alt="lowerMotive" />
              </div>
            </div>
            <div className="flex flex-col mx-auto pt-12 relative">
              <img
                className="absolute top-0 right-0 h-48"
                src={topLeaves}
                alt="topLeaves"
              />
              <div className="z-10 w-[90vw] rounded-t-full rounded-b-full overflow-hidden border-[1.5rem] border-y-full border-zinc-50 shadow-xl">
                <img className="w-[90vw] object-cover" src={hero} alt="hero" />
              </div>
              <img
                className="absolute top-[26rem] right-[10rem] h-52"
                src={lowerLeaves}
                alt="lowerLeaves"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

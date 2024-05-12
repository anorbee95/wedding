import upperMotive from "../assets/upperMotive.png";
import lowerMotive from "../assets/lowerMotive.png";
import topLeaves from "../assets/topLeaves.png";
import lowerLeaves from "../assets/lowerLeaves.png";
import hero from "../assets/hero.jpg";
import Countdown from "./CountDown";

export default function MobileHero() {
  return (
    <div className="md:hidden bg-white py-2">
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
              <img
                className="w-[90vw] object-cover"
                src={hero}
                alt="hero"
              />
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
  );
}

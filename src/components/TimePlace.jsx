import miniLeaves from "../assets/miniLeaves.png";
import Ceremony from "./cards/Ceremony";
import Info from "./cards/Info";
import Wedding from "./cards/Wedding";

export default function TimePlace() {
  return (
    <section id="time-place" className="bg-white">
      <div className="pt-20 pb-20 flex flex-col gap-4 items-center justify-center">
        <h1 className="relative uppercase font-gilda text-4xl m-4 text-custom-pink">
          <img
            className="absolute -top-8 left-28 h-12"
            src={miniLeaves}
            alt="miniLeaves"
          />
          Hol és Mikor
        </h1>
        <div className="flex flex-wrap justify-center gap-8">
          <Ceremony />
          <Wedding />
          <Info />
        </div>
      </div>
    </section>
  );
}

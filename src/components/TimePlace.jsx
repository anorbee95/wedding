import miniLeaves from "../assets/miniLeaves.png";
import Ceremony from "./cards/Ceremony";
import Party from "./cards/Party";
import Reception from "./cards/Reception";

export default function TimePlace() {
  return (
    <div className="bg-white">
      <div className="pt-20 pb-20 flex flex-col gap-4 items-center">
        <h1 className="relative uppercase font-gilda text-4xl m-4 text-custom-pink">
          <img
            className="absolute -top-8 left-28 h-12"
            src={miniLeaves}
            alt="miniLeaves"
          />
          Hol és Mikor
        </h1>
        <div className="flex gap-8">
          <Reception />
          <Ceremony />
          <Party />
        </div>
      </div>
    </div>
  );
}

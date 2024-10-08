import date from "../../assets/date.jpg";
import dateIcon from "../../assets/dateIcon.jpg";
import rightTopMotive from "../../assets/rightTopMotive.jpg";

export default function FirstDate() {
  return (
    <div className="max-w-[1200px] md:w-3/4 shadow-3xl">
      <div className="grid md:grid-cols-2 w-full md:h-96 rounded-md">
        <div className="relative h-96 w-full box-border">
          <img className="h-full w-full object-cover" src={date} alt="date" />
          <div className="absolute top-4 left-4 w-[92%] md:w-[94%] h-[92%] border"></div>
        </div>
        <div className="font-gilda relative m-12 border-t border-r">
          <img
            className="absolute -top-10 -right-10"
            src={rightTopMotive}
            alt="rightTopMotive"
          />
          <img className="mt-8" src={dateIcon} alt="meetIcon" />
          <h1 className="mt-4 uppercase text-2xl">Az első randink</h1>
          <p className="text-gray-500 text-lg mt-2">2018 november 2.</p>
          <p className="text-gray-600 text-sm 2xl:text-md mt-4 pr-5 text-justify">
            Az első randevúnk a Deák téri Costa Cafeban történt, amely sajnos
            már bezárt, de emlékei örökké élnek bennünk. Démi szemei már az
            elején megakadtak Norbi szerelem pázsitjában, míg Norbi fejben a buliban
            elvesztett iratai pótlásán töprengett. Így kezdődött az a
            hosszú, mély beszélgetés, ahol azonnal rájöttünk, hogy egy
            hullámhosszon vagyunk. Azóta is ápoljuk ezt a különleges
            kapcsolatot.
          </p>
        </div>
      </div>
    </div>
  );
}

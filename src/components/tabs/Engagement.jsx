import fam from "../../assets/fam.jpg";
import engagementIcon from "../../assets/engagementIcon.png";
import rightTopMotive from "../../assets/rightTopMotive.jpg";

export default function Engagement() {
  return (
    <div className="max-w-[1200px] md:w-3/4 shadow-3xl">
      <div className="grid md:grid-cols-2 w-full md:h-96 rounded-md">
        <div className="relative h-96 w-full box-border">
          <img className="h-full w-full object-cover" src={fam} alt="fam" />
          <div className="absolute top-4 left-4 w-[92%] md:w-[94%] h-[92%] border"></div>
        </div>
        <div className="font-gilda relative m-12 border-t border-r">
          <img
            className="absolute -top-10 -right-10"
            src={rightTopMotive}
            alt="rightTopMotive"
          />
          <img className="mt-7" src={engagementIcon} alt="engagementIcon" />
          <h1 className="mt-3 uppercase text-2xl">A Jegyesség</h1>
          <p className="text-gray-500 text-lg mt-2">Egészen a lagziig</p>
          <p className="text-gray-600 text-sm 2xl:text-md mt-4 pr-5 text-justify">
            #SpoilerAlert - Jegyességünk idejét Bütyikével töltöttük
            boldogságban és szeretetben. Bár idén a polgári szertartáson
            hivatalosan is egybekeltünk, az igazi nagy ünneplést jövőre
            tartogatjuk, ahol veletek együtt szeretnénk ünnepelni és megosztani
            boldogságunkat és örömünket.
          </p>
        </div>
      </div>
    </div>
  );
}

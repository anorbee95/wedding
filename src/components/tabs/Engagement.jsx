import fam from "../../assets/fam.jpg";
import engagementIcon from "../../assets/engagementIcon.png";
import rightTopMotive from "../../assets/rightTopMotive.jpg";

export default function Engagement() {
  return (
    <div className="max-w-[1200px] md:w-3/4 shadow-3xl">
      <div className="grid md:grid-cols-2 w-full md:h-96 rounded-md">
        <div className="relative h-96 w-full box-border">
          <img className="h-full w-full object-cover" src={fam} alt="fam" />
          <div className="absolute top-4 left-4 w-[90%] md:w-[94%] h-[92%] border"></div>
        </div>
        <div className="relative m-12 border-t border-r">
          <img
            className="absolute -top-10 -right-10"
            src={rightTopMotive}
            alt="rightTopMotive"
          />
          <img className="mt-7" src={engagementIcon} alt="engagementIcon" />
          <h1 className="mt-3 font-gilda uppercase text-2xl">Eljegyzés</h1>
          <p className="text-gray-500 text-lg mt-2">2018 október 2.</p>
          <p className="text-gray-600 text-md mt-4 pr-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            alias, cupiditate harum quisquam laboriosam amet temporibus!
          </p>
        </div>
      </div>
    </div>
  );
}
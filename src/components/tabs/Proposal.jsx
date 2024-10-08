import engagement from "../../assets/engagement.jpg";
import proposeIcon from "../../assets/proposeIcon.png";
import rightTopMotive from "../../assets/rightTopMotive.jpg";

export default function Proposal() {
  return (
    <div className="max-w-[1200px] md:w-3/4 shadow-3xl">
      <div className="grid md:grid-cols-2 w-full md:h-96 rounded-md">
        <div className="relative h-96 w-full box-border">
          <img
            className="h-full w-full object-cover"
            src={engagement}
            alt="engagement"
          />
          <div className="absolute top-4 left-4 w-[92%] md:w-[94%] h-[92%] border"></div>
        </div>
        <div className="font-gilda relative m-12 border-t border-r">
          <img
            className="absolute -top-10 -right-10"
            src={rightTopMotive}
            alt="rightTopMotive"
          />
          <img className="mt-8" src={proposeIcon} alt="proposeIcon" />
          <h1 className="mt-4 uppercase text-2xl">A Lánykérés</h1>
          <p className="text-gray-500 text-lg mt-2">2023 szeptember 21.</p>
          <p className="text-gray-600 text-sm 2xl:text-md mt-4 pr-5 text-justify">
            Norbi hosszú ideig hallgatta Démi kérlelő szavait a lánykérésről, de
            végül sikerült meglepnie Őt Isztambul varázslatos városában. Amikor
            a gyűrűt Démi ujjára húzta, az egész étterem Őket ünnepelte. Démi
            arca sugárzott a boldogságtól, és bár alig emlékszik a pillanatra,
            sosem felejtjük el azt a csodálatos estét.
          </p>
        </div>
      </div>
    </div>
  );
}

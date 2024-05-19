import { useState } from "react";
import miniLeaves from "../assets/miniLeaves.png";
import FirstMeet from "./tabs/FirstMeet";
import FirstDate from "./tabs/FirstDate";
import Proposal from "./tabs/Proposal";
import Engagement from "./tabs/Engagement";

export default function LoveStory() {
  const [activeTab, setActiveTab] = useState("meet");

  return (
    <section id="love-story" className="bg-white">
      <div className="pt-20 pb-28 flex flex-col gap-4 items-center">
        <h1 className="relative uppercase font-gilda text-2xl sm:text-4xl m-4 text-custom-pink">
          <img
            className="absolute -top-8 left-40 h-12"
            src={miniLeaves}
            alt="miniLeaves"
          />
          A Mi Történetünk
        </h1>
        <div className="mb-8">
          <div className="flex justify-center font-gilda font-medium text-[9px] xs:text-xs md:text-lg gap-5 md:gap-16 uppercase text-gray-500">
            <span
              className={`hover:text-custom-pink cursor-pointer ${
                activeTab === "meet" ? "text-custom-pink" : ""
              }`}
              onClick={() => setActiveTab("meet")}
            >
              Első találkozás
            </span>
            <span
              className={`hover:text-custom-pink cursor-pointer ${
                activeTab === "date" ? "text-custom-pink" : ""
              }`}
              onClick={() => setActiveTab("date")}
            >
              Első randi
            </span>
            <span
              className={`hover:text-custom-pink cursor-pointer ${
                activeTab === "propose" ? "text-custom-pink" : ""
              }`}
              onClick={() => setActiveTab("propose")}
            >
              Lánykérés
            </span>
            <span
              className={`hover:text-custom-pink cursor-pointer ${
                activeTab === "engage" ? "text-custom-pink" : ""
              }`}
              onClick={() => setActiveTab("engage")}
            >
              Jegyesség
            </span>
          </div>
        </div>
        {activeTab === "meet" && <FirstMeet />}
        {activeTab === "date" && <FirstDate />}
        {activeTab === "propose" && <Proposal />}
        {activeTab === "engage" && <Engagement />}
      </div>
    </section>
  );
}

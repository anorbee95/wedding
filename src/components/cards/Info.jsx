import { useState } from "react";
import { FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";
import { GiLargeDress  } from "react-icons/gi";
import bukovszki1 from "../../assets/bukovszki1.jpg";

export default function Info() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <div className="h-64 overflow-hidden rounded-t-lg">
        <img
          className="object-cover scale-125 translate-y-5"
          src={bukovszki1}
          alt="bukovszki1"
        />
      </div>
      <div className="relative p-5">
        <h5 className="mb-2 text-2xl font-gilda font-bold tracking-tight text-custom-pink">
          Fontos információk
        </h5>
        <span className="absolute top-6 right-3 bg-custom-pink text-gray-50 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
          --:--
        </span>
        <p className="font-gilda mb-3 h-16 font-medium text-xs text-justify text-gray-400">
          Az esküvői meghívó mellé szeretnénk néhány fontos információval
          szolgálni, hogy minden zökkenőmentes legyen. Az alábbiakban választ
          adunk a leggyakrabban felmerülő kérdésekre.
        </p>
        <button
          onClick={openModal}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-custom-pink bg-custom-pink-transparent rounded-lg hover:bg-custom-pink hover:text-white"
        >
          Részletek
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5">
              <h2 className="text-2xl text-center font-bold mb-4 font-gilda text-custom-pink">
                Fontos információk
              </h2>
              <div className="p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <ul className="list-none p-0 space-y-4 text-center font-medium font-gilda">
                  <li className="flex items-center space-x-4">
                    <GiLargeDress  className="text-4xl text-red-500" />
                    <p className="text-lg text-gray-700">
                      Öltözzetek alkalomhoz illően, kerüljétek a piros és a
                      fehér színt, és érrezétek jól magatokat!
                    </p>
                  </li>
                  <li className="flex items-center space-x-4">
                    <FaMoneyBillWave className="text-4xl text-green-500" />
                    <p className="text-lg text-gray-700">
                      Mit kérünk nászajándékba? Hogy velünk ünnepeljetek :){" "}
                      <br />
                    </p>
                  </li>
                  <li className="flex items-center space-x-4">
                    <FaInfoCircle className="text-4xl text-blue-500" />
                    <p className="text-lg text-gray-700">
                      Kérjük, érkezzetek időben a szertartásra, hogy
                      zökkenőmentesen el tudjunk kezdeni.
                    </p>
                  </li>
                </ul>
              </div>

              <button
                onClick={closeModal}
                className="w-full mt-4 px-4 py-2 bg-custom-pink text-white rounded-lg hover:bg-custom-pink-dark"
              >
                Bezárás
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

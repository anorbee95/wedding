import { useState } from "react";
import {
  FaDoorOpen,
  FaHeart,
  FaCamera,
  FaMicrophone,
  FaUtensils,
  FaMusic,
  FaBirthdayCake,
  FaUserFriends,
} from "react-icons/fa";
import bukovszki2 from "../../assets/bukovszki2.jpg";

export default function Wedding() {
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
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="h-64 overflow-hidden rounded-t-lg">
        <img
          className="object-cover scale-110"
          src={bukovszki2}
          alt="bukovszki2"
        />
      </div>
      <div className="relative p-5">
        <h5 className="mb-2 text-2xl font-gilda font-bold tracking-tight text-custom-pink">
          Polgári szertartás
        </h5>
        <span className="absolute top-5 right-3 bg-custom-pink text-gray-50 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
          18:00
        </span>
        <p className="font-gilda mb-3 h-16 font-normal text-xs text-justify text-gray-400">
          A vendégvárás a Bukovszki Birtokon 17:00-kor kezdődik. A polgári
          ceremónia 18:00-kor veszi kezdetét, majd 18:30-tól fotózkodásra
          invitáljuk a vendégeket. A vacsora 19:30-kor kezdődik.
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
          className="fixed font-gilda inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-h-[90vh] overflow-scroll shadow-lg w-11/12 md:w-3/4 lg:w-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5">
              <div className="mb-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2722.672957358705!2d19.59034447680216!3d46.96811533184918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4743d514039b3dd5%3A0x40867b7d549f70d7!2sBukovszki%20Birtok!5e0!3m2!1shu!2shu!4v1716225947706!5m2!1shu!2shu"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Maps"
                  className="rounded-lg"
                ></iframe>
              </div>
              <div className="mb-4">
                <h3 className="text-3xl font-semibold mb-4 text-center text-custom-pink">
                  Menetrend
                </h3>
                <div className="relative">
                  <div className="absolute inset-0 flex justify-center">
                    <div className="w-1 bg-custom-pink"></div>
                  </div>
                  <ul className="list-none p-0 m-0">
                    <li className="flex items-center mb-8 w-full">
                      <div className="w-1/2 text-right pr-4">
                        <span className="block text-custom-pink font-bold">
                          17:00
                        </span>
                        <span>Vendégvárás</span>
                      </div>
                      <div className="w-1/2 flex justify-start pl-4">
                        <span className="flex-shrink-0 bg-custom-pink text-white rounded-full w-8 h-8 flex items-center justify-center">
                          <FaDoorOpen />
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center mb-8 w-full">
                      <div className="w-1/2 flex justify-end pr-4">
                        <span className="flex-shrink-0 bg-custom-pink text-white rounded-full w-8 h-8 flex items-center justify-center">
                          <FaHeart />
                        </span>
                      </div>
                      <div className="w-1/2 text-left pl-4">
                        <span className="block text-custom-pink font-bold">
                          17:30
                        </span>
                        <span>Polgári szertartás</span>
                      </div>
                    </li>
                    <li className="flex items-center mb-8 w-full">
                      <div className="w-1/2 text-right pr-4">
                        <span className="block text-custom-pink font-bold">
                          18:30
                        </span>
                        <span>Fotózás</span>
                      </div>
                      <div className="w-1/2 flex justify-start pl-4">
                        <span className="flex-shrink-0 bg-custom-pink text-white rounded-full w-8 h-8 flex items-center justify-center">
                          <FaCamera />
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center mb-8 w-full">
                      <div className="w-1/2 flex justify-end pr-4">
                        <span className="flex-shrink-0 bg-custom-pink text-white rounded-full w-8 h-8 flex items-center justify-center">
                          <FaMicrophone />
                        </span>
                      </div>
                      <div className="w-1/2 text-left pl-4">
                        <span className="block text-custom-pink font-bold">
                          19:50
                        </span>
                        <span>Pohárköszöntő</span>
                      </div>
                    </li>
                    <li className="flex items-center mb-8 w-full">
                      <div className="w-1/2 text-right pr-4">
                        <span className="block text-custom-pink font-bold">
                          20:00
                        </span>
                        <span>Vacsora</span>
                      </div>
                      <div className="w-1/2 flex justify-start pl-4">
                        <span className="flex-shrink-0 bg-custom-pink text-white rounded-full w-8 h-8 flex items-center justify-center">
                          <FaUtensils />
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center mb-8 w-full">
                      <div className="w-1/2 flex justify-end pr-4">
                        <span className="flex-shrink-0 bg-custom-pink text-white rounded-full w-8 h-8 flex items-center justify-center">
                          <FaMusic />
                        </span>
                      </div>
                      <div className="w-1/2 text-left pl-4">
                        <span className="block text-custom-pink font-bold">
                          21:30
                        </span>
                        <span>Nyitótánc</span>
                      </div>
                    </li>
                    <li className="flex items-center mb-8 w-full">
                      <div className="w-1/2 text-right pr-4">
                        <span className="block text-custom-pink font-bold">
                          23:30
                        </span>
                        <span>Torta</span>
                      </div>
                      <div className="w-1/2 flex justify-start pl-4">
                        <span className="flex-shrink-0 bg-custom-pink text-white rounded-full w-8 h-8 flex items-center justify-center">
                          <FaBirthdayCake />
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center mb-8 w-full">
                      <div className="w-1/2 flex justify-end pr-4">
                        <span className="flex-shrink-0 bg-custom-pink text-white rounded-full w-8 h-8 flex items-center justify-center">
                          <FaUserFriends />
                        </span>
                      </div>
                      <div className="w-1/2 text-left pl-4">
                        <span className="block text-custom-pink font-bold">
                          00:00
                        </span>
                        <span>Töltött káposzta és tánc</span>
                      </div>
                    </li>
                  </ul>
                </div>
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

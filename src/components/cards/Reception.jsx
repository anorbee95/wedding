import { useState } from "react";
import bukovszki1 from "../../assets/bukovszki1.jpg";

export default function Reception() {
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
          Vendégvárás
        </h5>
        <span className="absolute top-6 right-3 bg-custom-pink text-gray-50 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
          17:00
        </span>
        <p className="mb-3 h-16 font-normal text-xs text-justify text-gray-400">
        A vendégvárás a Bukovszki Birtokon 17:00-kor kezdődik. Az apakönyvvezetés 18:00-kor veszi kezdetét, majd 19:00-tól fotózkodásra invitáljuk a vendégeket. Az est fénypontja, a nyitótánc, 19:30-kor következik.
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
              <h2 className="text-2xl font-bold mb-4 font-gilda text-custom-pink">
                Vendégvárás
              </h2>
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
                <h3 className="text-xl font-semibold mb-2">Menetrend</h3>
                <ul className="list-none list-inside">
                  <li><span className="ml-2 text-custom-pink font-bold">17:00</span> - Vendégvárás a birtokon</li>
                  <li><span className="ml-2 text-custom-pink font-bold">18:00</span> - Apakönyvvezetés kezdete</li>
                  <li><span className="ml-2 text-custom-pink font-bold">19:00</span> - Fotózkodás</li>
                  <li><span className="ml-2 text-custom-pink font-bold">19:30</span> - Nyitótánc</li>
                </ul>
              </div>
              <button
                onClick={closeModal}
                className="mt-4 px-4 py-2 bg-custom-pink text-white rounded-lg hover:bg-custom-pink-dark"
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

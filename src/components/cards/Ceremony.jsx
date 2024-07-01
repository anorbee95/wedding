import { useState } from "react";
import templom from "../../assets/templom.jpg";

export default function Ceremony() {
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
          className="object-cover -translate-y-44"
          src={templom}
          alt="templom"
        />
      </div>
      <div className="relative p-5">
        <h5 className="mb-2 text-2xl font-gilda font-bold tracking-tight text-custom-pink">
          Templomi szertartás
        </h5>
        <span className="absolute top-5 right-3 bg-custom-pink text-gray-50 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
          16:00
        </span>
        <p className="mb-3 h-16 font-normal text-xs text-justify text-gray-400">
        A templomi szertartásra 15:30-tól várjuk a vendégeket. A ceremónia 16:30-ig tart, majd 17:00-kor indulunk vissza a Bukovszki Birtokra, hogy folytassuk az ünneplést.
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
                Templomi szertartás
              </h2>
              <div className="mb-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2725.6985033821957!2d19.689967776799584!3d46.90864753591276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4743da10d13345cb%3A0xae5f3bb6601b27bb!2sKecskem%C3%A9ti%20Evang%C3%A9likus%20templom!5e0!3m2!1shu!2shu!4v1716226191417!5m2!1shu!2shu"
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
                  <li><span className="ml-2 text-custom-pink font-bold">15:30</span> - Vendégek érkezése</li>
                  <li><span className="ml-2 text-custom-pink font-bold">16:00</span> - Ceremónia kezdete</li>
                  <li><span className="ml-2 text-custom-pink font-bold">16:30</span> - Ceremónia vége</li>
                  <li><span className="ml-2 text-custom-pink font-bold">17:00</span> - Visszatérés a Bukovszki Birtokra</li>
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

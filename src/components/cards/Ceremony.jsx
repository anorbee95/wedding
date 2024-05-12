import templom from "../../assets/templom.jpg";

export default function Ceremony() {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="h-64 overflow-hidden rounded-t-lg">
      <img className="object-cover -translate-y-44" src={templom} alt="templom" />
    </div>
    <div className="p-5">
        <h5 className="mb-2 text-2xl font-gilda font-bold tracking-tight text-custom-pink">
          Templomi szertartás
        </h5>
        <p className="mb-3 font-normal text-gray-700">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <a
          href="#"
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
        </a>
      </div>
  </div>
  )
}

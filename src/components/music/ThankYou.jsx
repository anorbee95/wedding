import { Link } from "react-router-dom";
import { GrPrevious } from "react-icons/gr";
import bubike from "../../assets/bubike.jpg";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-custom-pink via-custom-pink-transparent to-custom-pink flex flex-col items-center justify-center p-6">
      <div className="h-16 flex items-center justify-center mb-8">
        <Link to="/">
          <h1 className="cursor-pointer text-6xl font-alex-brush text-custom-pink">
            Démi & Norbi
          </h1>
        </Link>
      </div>
      <div className="bg-zinc-100 bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-center mb-6">
          <Link
            to="/"
            className="text-gray-400 text-lg text-center hover:text-gray-500 transition-colors"
          >
            <span className="flex items-center gap-2">
              <GrPrevious className="text-sm" /> Vissza az oldalra
            </span>
          </Link>
        </div>
        <div className="text-center">
          <h2 className="text-custom-pink text-3xl font-semibold mb-4">
            Köszönjük a kitöltést!
          </h2>
          <div className="w-64 h-96 mx-auto my-4 rounded-md overflow-hidden cursor-pointer bg-custom-light flex justify-center items-center">
            <img
              className="h-full w-full object-cover hover:grayscale hover:scale-125 transition-all duration-500 ease-in-out"
              src={bubike}
              alt="seeYou"
            />
          </div>
          <h3 className="text-custom-pink text-2xl mb-4">
            El is mentettük a kedvenc számaidat.
          </h3>
        </div>
      </div>
    </div>
  );
}

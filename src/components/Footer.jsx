import miniLeaves from "../assets/miniLeaves.png";
import kivaloLagzi from "../assets/partners/kivaloLagzi.png";
import leonArt from "../assets/partners/leonArt.png";
import rDj from "../assets/partners/rDj.png";
import whiteHouse from "../assets/partners/whiteHouse.png";
import bukovszki from "../assets/partners/bukovszki.png";

// const partners = [
//   { image: leonArt, link: "https://www.leonartpress.hu/" },
//   { image: kivaloLagzi, link: "https://kivalolagzi.hu/" },
//   { image: bukovszki, link: "https://www.facebook.com/bukovszkibirtok/" },
//   { image: whiteHouse, link: "https://www.whitehousedecor.hu/" },
//   { image: rDj, link: "https://www.rendezvenydj.com/" },
//   { image: bagatell, link: "http://bagatelletterem.hu/" },
// ];

export default function Footer() {
  return (
    <section id="footer" className="bg-white">
      <div className="py-20 lg:py-16 mx-auto max-w-screen-xl px-4">
        <div className="flex justify-center mb-8">
          <h1 className="relative uppercase font-gilda text-center text-4xl m-4 text-custom-pink">
            <img
              className="absolute -top-8 left-40 md:left-52 h-12"
              src={miniLeaves}
              alt="miniLeaves"
            />
            Jó kezekben leszünk!
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-5">
          <a href="https://www.leonartpress.hu/" target="_blank">
            <img
              className="cursor-pointer mt-5 md:scale-125"
              src={leonArt}
              alt="leonArt"
            />
          </a>
          <a href="https://kivalolagzi.hu/" target="_blank">
            <img
              className="cursor-pointer mt-1 md:scale-125"
              src={kivaloLagzi}
              alt="kivaloLagzi"
            />
          </a>
          <a href="https://www.facebook.com/bukovszkibirtok/" target="_blank">
            <img
              className="cursor-pointer rounded-full scale-75 md:scale-100"
              src={bukovszki}
              alt="bukovszki"
            />
          </a>
          <a href="https://www.whitehousedecor.hu/" target="_blank">
            <img
              className="cursor-pointer mt-3 md:scale-125"
              src={whiteHouse}
              alt="whiteHouse"
            />
          </a>
          <a href="https://www.rendezvenydj.com/" target="_blank">
            <img
              className="cursor-pointer mt-2 scale-75 md:scale-90"
              src={rDj}
              alt="rDj"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

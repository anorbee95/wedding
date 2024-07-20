import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import middleImage from "../assets/middleImage.jpg";

export default function About() {
  return (
    <>
      <section id="about" className="hidden md:block bg-white">
        <div className="py-20">
          <div className="grid font-gilda grid-cols-3 place-items-center bg-custom-light h-72 w-3/4 mx-auto rounded-md">
            <div className="text-right p-5">
              <h3 className="text-3xl my-2 font-gilda">Démia</h3>
              <p className="text-gray-500 py-2 text-sm 2xl:text-md text-justify">
                Mesterségem címere HR-es, mellék állásban gyógypedagógus és
                harmad állásban meg nem fizetett egyetemista házvezetőnő.
                Szabadidőmben, Netflix-maratonokat tartok, hűséges társammal
                Bütyikével. Ha épp nem ennek a szenvedélyemnek hódolok, akkor
                valószínűleg csocsózok a másodikon vagy sushival tömöm a bendőm
                az uram kontójára. Sokan mondják, hogy ilyen fiatalon
                megházasodni olyan, mint korán hazamenni egy buliból, így hát a
                mottóm, hogy legalább Norbinak nem kell majd fiatal szerető.
              </p>
              <div className="mt-2 flex justify-end gap-4">
                <a
                  href="https://www.instagram.com/kovacsdemi/"
                  target="_blank"
                  className="cursor-pointer text-custom-pink"
                >
                  <FaInstagramSquare />
                </a>
                <a
                  href="https://www.facebook.com/demia.kovacs"
                  target="_blank"
                  className="cursor-pointer text-custom-pink"
                >
                  <FaFacebookSquare />
                </a>
                <a
                  href="https://wa.me/+36204086015"
                  target="_blank"
                  className="cursor-pointer text-custom-pink"
                >
                  <FaWhatsappSquare />
                </a>
              </div>
            </div>
            <div className="rounded-full overflow-hidden border-[1.5rem] border-zinc-50 shadow-3xl">
              <img
                className="h-92 object-cover"
                src={middleImage}
                alt="middleImage"
              />
            </div>
            <div className="p-5">
              <h3 className="text-3xl my-2">Norbert</h3>
              <p className="text-gray-500 text-sm 2xl:text-md py-2 text-justify">
                Sikerült villamosmérnöki diplomával a zsebemben a sport
                világában kikötnöm, aminek köszönhetően beutazhattam a világot,
                és közben programozni is megtanultam. Szóval amúgy, ha bármi nem
                működik ezen a weboldalon, az az én hibám. Szabadidőmben,
                Démikét hátrahagyva hódolok a sportszeretetemnek és programozok
                (mert mi lehetne szórakoztatóbb, mint egész éjjel hibákat
                keresni a kódban?). Mottóm, és az esküvőre mindenki számára, :
                „Ezt a kicsit még megiszom, aztán maradunk!.
              </p>
              <div className="mt-2 flex gap-4">
                <a
                  href="https://www.instagram.com/norbertaugusztin/"
                  target="_blank"
                  className="cursor-pointer text-custom-pink"
                >
                  <FaInstagramSquare />
                </a>
                <a
                  href="https://www.facebook.com/augusztinnorbi"
                  target="_blank"
                  className="cursor-pointer text-custom-pink"
                >
                  <FaFacebookSquare />
                </a>
                <a
                  href="https://wa.me/+36309517623"
                  target="_blank"
                  className="cursor-pointer text-custom-pink"
                >
                  <FaWhatsappSquare />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* MOBILE */}
      <section id="mobile-about" className="md:hidden bg-white">
        <div className="pb-12">
          <div className="grid font-gilda place-items-center bg-custom-light mx-4 rounded-md">
            <div className="text-center py-4">
              <h3 className="text-3xl my-1">Démia</h3>
              <p className="text-gray-500 p-3 text-justify">
                Sokáig autista gyerekekre vigyáztam, amit most is szívből
                csinálok HR-es munkám mellett. Imádok Netflixezni az ágyból,
                kirándulni Bütyikével és sushizni Norbival. Szabadidőmben
                leginkább pihenek. Vidám, gondoskodó és gyönyörű lélekként élem
                az életem, mosollyal az arcomon.
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://www.instagram.com/kovacsdemi/"
                  target="_blank"
                  className="cursor-pointer text-custom-pink"
                >
                  <FaInstagramSquare />
                </a>
                <a
                  href="https://www.facebook.com/demia.kovacs"
                  target="_blank"
                  className="cursor-pointer text-custom-pink"
                >
                  <FaFacebookSquare />
                </a>
                <a
                  href="https://wa.me/+36204086015"
                  target="_blank"
                  className="cursor-pointer text-custom-pink"
                >
                  <FaWhatsappSquare />
                </a>
              </div>
            </div>
            <div className="my-5 rounded-full overflow-hidden border-[1.5rem] border-zinc-50 shadow-3xl">
              <img
                className="h-92 object-cover"
                src={middleImage}
                alt="middleImage"
              />
            </div>
            <div className="text-center py-4 mb-3">
              <h3 className="text-3xl my-1">Norbert</h3>
              <p className="text-gray-500 p-3 text-justify">
                Villamosmérnöki diplomával a sport világában találtam magam, a
                Teqball sportcsapat vezetőjeként. Programozást is tanulok, ennek
                köszönhető ez a weboldal. Hobbim a foci, kondizás, programozás,
                utazás és Bütyikével való kirándulás. Vidám, vicces (legalábbis
                azt hiszem), és maximalista vagyok.
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://www.instagram.com/norbertaugusztin/"
                  target="_blank"
                  className="cursor-pointer text-custom-pink"
                >
                  <FaInstagramSquare />
                </a>
                <a
                  href="https://www.facebook.com/augusztinnorbi"
                  target="_blank"
                  className="cursor-pointer text-custom-pink"
                >
                  <FaFacebookSquare />
                </a>
                <a
                  href="https://wa.me/+36309517623"
                  target="_blank"
                  className="cursor-pointer text-custom-pink"
                >
                  <FaWhatsappSquare />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

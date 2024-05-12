import middleImage from "../assets/middleImage.jpg";
import {
  FaFacebookSquare,
  FaWhatsappSquare,
  FaInstagramSquare,
} from "react-icons/fa";

export default function MobileAbout() {
  return (
    <div className="md:hidden bg-white">
      <div className="pb-12">
        <div className="grid font-gilda place-items-center bg-custom-light mx-4 rounded-md">
          <div className="text-center py-4">
            <h3 className="text-3xl my-3">Démia</h3>
            <p className="text-gray-500 py-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
              quod repellat dolore voluptate sunt, assumenda explicabo
              consequuntur provident expedita libero corrupti dignissimos velit?
              Autem!
            </p>
            <div className="flex justify-center gap-4">
              <span className="text-custom-pink">
                <FaInstagramSquare />
              </span>
              <span className="text-custom-pink">
                <FaFacebookSquare />
              </span>
              <span className="text-custom-pink">
                <FaWhatsappSquare />
              </span>
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
            <h3 className="text-3xl my-3">Norbert</h3>
            <p className="text-gray-500 py-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
              quod repellat dolore voluptate sunt, assumenda explicabo
              consequuntur provident expedita libero corrupti dignissimos velit?
              Autem!
            </p>
            <div className="flex justify-center gap-4">
              <span className="text-custom-pink">
                <FaInstagramSquare />
              </span>
              <span className="text-custom-pink">
                <FaFacebookSquare />
              </span>
              <span className="text-custom-pink">
                <FaWhatsappSquare />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

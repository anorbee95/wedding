import { FaFacebookSquare, FaInstagramSquare, FaWhatsappSquare } from "react-icons/fa";
import middleImage from "../assets/middleImage.jpg";

export default function About() {
  return (
    <div className="hidden md:block bg-white">
      <div className="pb-20">
        <div className="grid font-gilda grid-cols-3 place-items-center bg-custom-light h-72 w-3/4 mx-auto rounded-md">
          <div className="text-right p-5">
            <h3 className="text-3xl my-3 font-gilda">Démia</h3>
            <p className="text-gray-500 py-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
              quod repellat dolore voluptate sunt, assumenda explicabo
              consequuntur provident expedita libero corrupti dignissimos velit?
              Autem!
            </p>
            <div className="flex justify-end gap-4">
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
          <div className="rounded-full overflow-hidden border-[1.5rem] border-zinc-50 shadow-3xl">
            <img
              className="h-92 object-cover"
              src={middleImage}
              alt="middleImage"
            />
          </div>
          <div className="p-5">
            <h3 className="text-3xl my-3">Norbert</h3>
            <p className="text-gray-500 py-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
              quod repellat dolore voluptate sunt, assumenda explicabo
              consequuntur provident expedita libero corrupti dignissimos velit?
              Autem!
            </p>
            <div className="flex gap-4">
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

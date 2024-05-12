import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { guest } = useParams();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`z-30 fixed top-0 left-0 w-full transition-shadow duration-300 ease-in-out ${
        isScrolled ? "shadow-md bg-white" : "bg-transparent"
      }`}
    >
      <div className="max-w-[82%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="cursor-pointer text-3xl font-alex-brush  text-custom-pink">
            Démi & Norbi
          </h1>
          <nav className="flex gap-8 uppercase items-center h-full font-gilda">
            <div className="h-full hover:border-b-2 hover:border-custom-pink">
              <a
                href="#home"
                className="h-full flex items-center box-border text-gray-800 hover:text-custom-pink px-3 py-2 text-sm font-semibold"
              >
                Rólunk
              </a>
            </div>
            <div className="h-full flex items-center hover:border-b-2 hover:border-custom-pink">
              <a
                href="#about"
                className="h-full flex items-center text-gray-800 hover:text-custom-pink  px-3 py-2 text-sm font-semibold"
              >
                Történetünk
              </a>
            </div>
            <div className="h-full flex items-center hover:border-b-2 hover:border-custom-pink">
              <a
                href="#services"
                className="text-gray-800 hover:text-custom-pink  px-3 py-2 text-sm font-semibold"
              >
                Galéria
              </a>
            </div>
            <div className="h-full flex items-center hover:border-b-2 hover:border-custom-pink">
              <a
                href="#services"
                className="text-gray-800 hover:text-custom-pink  px-3 py-2 text-sm font-semibold"
              >
                Hol és Mikor
              </a>
            </div>
            <div className="h-full flex items-center hover:border-b-2 hover:border-custom-pink">
              <a
                href="#contact"
                className="text-gray-800 hover:text-custom-pink  px-3 py-2 text-sm font-semibold"
              >
                RSVP
              </a>
            </div>
          </nav>
          <span className="text-custom-pink font-alex-brush text-3xl font-medium">
            {guest ? `Hello ${guest}!` : ""}
          </span>
        </div>
      </div>
    </header>
  );
}

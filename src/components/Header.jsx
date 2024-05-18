import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
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
  
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.75,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header
      className={`z-30 fixed top-0 left-0 w-full transition-shadow duration-300 ease-in-out ${
        isScrolled ? "shadow-md bg-white" : "bg-transparent"
      }`}
    >
      <div className="max-w-[82%] mx-auto md:px-4 lg:px-8">
        <div className="xl:hidden h-16 flex items-center justify-center">
          <h1
            className="cursor-pointer text-3xl font-alex-brush text-custom-pink"
            onClick={scrollToTop}
          >
            Démi & Norbi
          </h1>
        </div>
        <div className="hidden xl:flex items-center justify-between h-16">
          <h1
            className="cursor-pointer text-3xl font-alex-brush text-custom-pink"
            onClick={scrollToTop}
          >
            Démi & Norbi
          </h1>
          <nav className="flex uppercase items-center h-full font-gilda">
            <div className="h-full hover:border-b-2 hover:border-custom-pink">
              <a
                href="#about"
                className={`h-full flex items-center box-border text-gray-800 px-3 py-2 text-sm font-semibold ${
                  activeSection === "about"
                    ? "active-nav-item"
                    : "hover:text-custom-pink"
                }`}
              >
                Rólunk
              </a>
            </div>
            <div className="h-full flex items-center hover:border-b-2 hover:border-custom-pink">
              <a
                href="#love-story"
                className={`h-full flex items-center text-gray-800 px-8 py-2 text-sm font-semibold ${
                  activeSection === "love-story"
                    ? "active-nav-item"
                    : "hover:text-custom-pink"
                }`}
              >
                Történetünk
              </a>
            </div>
            <div className="h-full flex items-center hover:border-b-2 hover:border-custom-pink">
              <a
                href="#gallery"
                className={`h-full flex items-center text-gray-800 px-8 py-2 text-sm font-semibold ${
                  activeSection === "gallery"
                    ? "active-nav-item"
                    : "hover:text-custom-pink"
                }`}
              >
                Galéria
              </a>
            </div>
            <div className="h-full flex items-center hover:border-b-2 hover:border-custom-pink">
              <a
                href="#time-place"
                className={`h-full flex items-center text-gray-800 px-8 py-2 text-sm font-semibold ${
                  activeSection === "time-place"
                    ? "active-nav-item"
                    : "hover:text-custom-pink"
                }`}
              >
                Hol és Mikor
              </a>
            </div>
            <div className="h-full flex items-center hover:border-b-2 hover:border-custom-pink">
              <a
                href="#rsvp"
                className={`h-full flex items-center text-gray-800 px-8 py-2 text-sm font-semibold ${
                  activeSection === "rsvp"
                    ? "active-nav-item"
                    : "hover:text-custom-pink"
                }`}
              >
                RSVP
              </a>
            </div>
          </nav>
          <span className="text-custom-pink font-alex-brush text-3xl font-medium">
            {guest
              ? `Hello ${guest.charAt(0).toUpperCase() + guest.slice(1)}!`
              : "Üdv az oldalon!"}
          </span>
        </div>
      </div>
    </header>
  );
}

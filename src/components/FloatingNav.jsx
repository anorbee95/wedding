import { useState, useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import { AiFillAppstore } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineRsvp } from "react-icons/md";

const data = [
  { id: 1, link: "#mobile-hero", icon: <AiFillHome />, section: "mobile-hero" },
  { id: 2, link: "#mobile-about", icon: <BsPersonFill />, section: "mobile-about" },
  { id: 3, link: "#love-story", icon: <IoMdHeart />, section: "love-story" },
  { id: 4, link: "#gallery", icon: <AiFillAppstore />, section: "gallery" },
  { id: 5, link: "#time-place", icon: <IoLocationSharp />, section: "time-place" },
  { id: 6, link: "#rsvp", icon: <MdOutlineRsvp />, section: "rsvp" },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      setScrollTimeout(setTimeout(() => {
        setIsVisible(false);
      }, 2000));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: [0.25, 0.5],
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

  return (
    <ul
      className={`flex md:hidden items-center fixed bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-30 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex gap-4 bg-black bg-opacity-40 p-2 rounded-full backdrop-blur-lg">
        {data.map((item) => (
          <li key={item.id} className="relative">
            <a
              href={item.link}
              className={`p-2 sm:p-3 rounded-full text-white text-md sm:text-xl grid ${
                activeSection === item.section
                  ? "bg-custom-pink"
                  : "hover:bg-custom-pink-transparent"
              }`}
            >
              {item.icon}
            </a>
          </li>
        ))}
      </div>
    </ul>
  );
}

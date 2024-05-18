import { useState, useEffect } from 'react';
import miniLeaves from "../assets/miniLeaves.png";
import fekvo1 from "../assets/fekvo/fekvo1.jpg";
import fekvo2 from "../assets/fekvo/fekvo2.jpg";
import fekvo3 from "../assets/fekvo/fekvo3.jpg";
import fekvo4 from "../assets/fekvo/fekvo4.jpg";
import fekvo5 from "../assets/fekvo/fekvo5.jpg";
import fekvo6 from "../assets/fekvo/fekvo6.jpg";
import fekvo7 from "../assets/fekvo/fekvo7.jpg";
import fekvo8 from "../assets/fekvo/fekvo8.jpg";
import fekvo9 from "../assets/fekvo/fekvo9.jpg";

const images = [fekvo1, fekvo2, fekvo3, fekvo4, fekvo5, fekvo6, fekvo7, fekvo8, fekvo9];
images.sort(() => Math.random() - 0.5);

export default function Gallery() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, currentImage]);

  const openModal = (idx) => {
    document.body.style.overflow = 'hidden';
    setCurrentImage(idx);
    setModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = 'auto';
    setModalOpen(false);
  };

  const nextImage = () => setCurrentImage((currentImage + 1) % images.length);
  const prevImage = () => setCurrentImage((currentImage - 1 + images.length) % images.length);

  const handleClickOutside = (event) => {
    if (event.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  };

  return (
    <div id='gallery' className="bg-white">
      <div className="pt-20 pb-10 lg:pb-20 flex flex-col gap-4 items-center justify-center">
        <h1 className="relative uppercase font-gilda text-4xl m-4 text-custom-pink">
          <img className="absolute -top-8 left-16 h-12" src={miniLeaves} alt="miniLeaves" />
          Galéria
        </h1>
        <div className="flex justify-center flex-wrap 2xl:grid 2xl:grid-cols-3 gap-8 my-4 mx-auto">
          {images.map((image, idx) => (
            <div
              key={image + idx}
              onClick={() => openModal(idx)}
              className="w-96 h-64 rounded-md overflow-hidden cursor-pointer bg-custom-light flex justify-center items-center"
            >
              <img
                className="h-full w-full object-cover hover:grayscale hover:scale-125 transition-all duration-500 ease-in-out"
                src={image}
                alt={`image ${idx}`}
              />
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="z-50 modal-backdrop fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={handleClickOutside}>
          <div className="modal-content relative p-4 rounded-lg md:max-w-[60%] mx-auto">
            <img className="w-full h-auto rounded-md" src={images[currentImage]} alt={`image ${currentImage}`} />
          </div>
        </div>
      )}
    </div>
  );
}

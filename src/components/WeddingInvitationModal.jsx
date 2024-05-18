import { useEffect } from "react";

const WeddingInvitationModal = ({ isOpen, onClose }) => {
  const handleOutsideClick = (event) => {
    if (event.target.id === "backdrop") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      id="backdrop"
      className="z-50 fixed h-full inset-0 bg-black bg-opacity-75 flex justify-center items-center p-4"
    >
      <div className="bg-white aspect-modal w-[90%] md:w-auto md:h-[90%] mx-auto rounded-lg shadow-lg overflow-hidden">
        <div className="p-5 bg-modal-bg bg-contain h-full">
          <div className="relative w-3/4 flex flex-col items-center mx-auto">
            <button
              onClick={() => onClose()}
              className="text-xs md:text-lg mt-3 2xl:mt-8 font-gilda text-custom-pink-transparent border border-custom-pink-transparent rounded-md p-1 2xl:p-2 hover:bg-custom-pink-transparent hover:text-gray-50"
            >
              Ugrás az oldalra
            </button>
            <h2 className="mt-12 text-center text-3xl font-semibold text-gray-800 mb-2">
              {""}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingInvitationModal;

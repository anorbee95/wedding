import { useState, useEffect } from 'react';
import video from '../assets/video/jegyesVidi.mp4'

export default function VideoBanner() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const stopScroll = () => {
      document.body.style.overflow = showVideo ? 'hidden' : 'auto';
    };

    document.addEventListener('keydown', handleKeyDown);
    stopScroll();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showVideo]);

  const handleClick = () => {
    setShowVideo(true);
  };

  const handleClose = () => {
    setShowVideo(false);
  };

  const handleModalClick = (event) => {
    if (event.target.classList.contains('modal-backdrop')) {
      handleClose();
    }
  };

  return (
    <div className="grid place-items-center h-[28rem] bg-[#77777744]">
      <div 
        onClick={handleClick}
        className="h-24 w-24 bg-[#eeeeee66] hover:bg-[#eeeeee44] rounded-full border-2 flex items-center justify-center cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 23 24"
          stroke="white"
          className="pl-1 h-20 w-20 text-gray-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M14.752 11.168l-5.197-3.066A1 1 0 008 9.065v6.102a1 1 0 001.555.832l5.197-3.066a1 1 0 000-1.665z"
          />
        </svg>
      </div>

      {showVideo && (
        <div className="z-50 modal-backdrop fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
             onClick={handleModalClick}>
          <div className="relative p-4" onClick={e => e.stopPropagation()}>
            <button onClick={handleClose} className="z-10 cursor-pointer absolute top-3 right-5 text-gray-400 text-2xl p-2">×</button>
            <video
              src={video}
              controls
              autoPlay
              className="max-h-[90vh] max-w-[90vw] rounded-xl"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

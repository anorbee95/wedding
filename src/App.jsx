import { useState } from "react";
import About from "./components/About";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import LoveStory from "./components/LoveStory";
import RSVP from "./components/RSVP";
import Header from "./components/Header";
import VideoBanner from "./components/VideoBanner";
import WeddingInvitationModal from "./components/WeddingInvitationModal";
import TimePlace from "./components/TimePlace";
import FloatingNav from "./components/FloatingNav";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-[url('./assets/video2.jpg')] bg-fixed bg-top">
      <WeddingInvitationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Header />
      <Hero />
      <About />
      <LoveStory />
      <VideoBanner />
      <Gallery />
      <TimePlace />
      {/* <RSVP /> */}
      <FloatingNav />
      <Footer />
    </div>
  );
}

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
import MobileHero from "./components/MobileHero";
import MobileAbout from "./components/MobileAbout";
import TimePlace from "./components/TimePlace";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <WeddingInvitationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Header />
      <Hero />
      <MobileHero />
      <About />
      <MobileAbout />
      <LoveStory />
      <VideoBanner />
      <Gallery />
      <TimePlace />
      <RSVP />
      <Footer />
    </div>
  );
}

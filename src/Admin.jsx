import { useState } from "react";
import {
  FaTasks,
  FaDollarSign,
  FaUsers,
  FaMusic,
  FaBars,
  FaTimes,
  FaArrowUp,
} from "react-icons/fa";
import TodoList from "./components/admin/TodoList";
import GuestList from "./components/admin/GuestList";
import FavoriteSongs from "./components/admin/FavSongs";
import BudgetPlanner from "./components/admin/BudgetPlanner";
import { useNavigate } from "react-router-dom";
import Invitations from "./components/admin/Invitations";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("Todos");
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "Todos":
        return <TodoList />;
      case "Budget":
        return <BudgetPlanner />;
      case "GuestList":
        return <GuestList />;
      case "FavoriteSongs":
        return <FavoriteSongs />;
      case "Invitations":
        return <Invitations />;
      default:
        return null;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen min-w-screen md:flex bg-gray-50 relative">
      <div className="md:hidden p-4">
        <button
          className="text-gray-500 focus:outline-none"
          onClick={() => setIsOffCanvasOpen(true)}
        >
          <FaBars className="w-6 h-6" />
        </button>
      </div>
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isOffCanvasOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOffCanvasOpen(false)}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 bg-white w-64 p-4 z-50 transform transition-transform duration-300 md:hidden ${
          isOffCanvasOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="text-gray-500 mb-4 focus:outline-none"
          onClick={() => setIsOffCanvasOpen(false)}
        >
          <FaTimes className="w-6 h-6" />
        </button>
        <ul className="flex flex-col space-y-2 font-medium text-gray-500">
          <li className="text-center mb-4">
            <h1
              onClick={() => navigate("/")}
              className="cursor-pointer text-4xl font-alex-brush text-custom-pink"
            >
              Démi & Norbi
            </h1>
            <h2 className="cursor-pointer text-2xl font-alex-brush text-custom-pink">
              Admin
            </h2>
          </li>
          <li>
            <button
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                activeTab === "Todos"
                  ? "text-white bg-custom-pink"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveTab("Todos");
                setIsOffCanvasOpen(false);
              }}
            >
              <FaTasks
                className={`w-4 h-4 me-2 ${
                  activeTab === "Todos" ? "text-white" : "text-gray-500"
                }`}
              />
              Teendők
            </button>
          </li>
          <li>
            <button
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                activeTab === "Invitations"
                  ? "text-white bg-custom-pink"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveTab("Invitations");
                setIsOffCanvasOpen(false);
              }}
            >
              <FaTasks
                className={`w-4 h-4 me-2 ${
                  activeTab === "Invitations" ? "text-white" : "text-gray-500"
                }`}
              />
              Meghívók
            </button>
          </li>
          <li>
            <button
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                activeTab === "Budget"
                  ? "text-white bg-custom-pink"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveTab("Budget");
                setIsOffCanvasOpen(false);
              }}
            >
              <FaDollarSign
                className={`w-4 h-4 me-2 ${
                  activeTab === "Budget" ? "text-white" : "text-gray-500"
                }`}
              />
              Költségek
            </button>
          </li>
          <li>
            <button
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                activeTab === "GuestList"
                  ? "text-white bg-custom-pink"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveTab("GuestList");
                setIsOffCanvasOpen(false);
              }}
            >
              <FaUsers
                className={`w-4 h-4 me-2 ${
                  activeTab === "GuestList" ? "text-white" : "text-gray-500"
                }`}
              />
              Vendégek
            </button>
          </li>
          <li>
            <button
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                activeTab === "FavoriteSongs"
                  ? "text-white bg-custom-pink"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveTab("FavoriteSongs");
                setIsOffCanvasOpen(false);
              }}
            >
              <FaMusic
                className={`w-4 h-4 me-2 ${
                  activeTab === "FavoriteSongs" ? "text-white" : "text-gray-500"
                }`}
              />
              Zenék
            </button>
          </li>
        </ul>
      </div>
      <ul className="hidden md:block md:w-72 py-4 px-2 text-xs md:text-base space-y-2 font-medium md:border-r border-custom-pink text-gray-500 md:me-4 mb-4 md:mb-0">
        <li className="text-center mb-4">
          <h1
            onClick={() => navigate("/")}
            className="cursor-pointer text-4xl font-alex-brush text-custom-pink"
          >
            Démi & Norbi
          </h1>
          <h2 className="cursor-pointer text-2xl font-alex-brush text-custom-pink">
            Admin
          </h2>
        </li>
        <li>
          <button
            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
              activeTab === "Todos"
                ? "text-white bg-custom-pink"
                : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("Todos")}
          >
            <FaTasks
              className={`w-4 h-4 me-2 ${
                activeTab === "Todos" ? "text-white" : "text-gray-500"
              }`}
            />
            Teendők
          </button>
        </li>
        <li>
          <button
            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
              activeTab === "Invitations"
                ? "text-white bg-custom-pink"
                : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("Invitations")}
          >
            <FaTasks
              className={`w-4 h-4 me-2 ${
                activeTab === "Invitations" ? "text-white" : "text-gray-500"
              }`}
            />
            Meghívók
          </button>
        </li>
        <li>
          <button
            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
              activeTab === "Budget"
                ? "text-white bg-custom-pink"
                : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("Budget")}
          >
            <FaDollarSign
              className={`w-4 h-4 me-2 ${
                activeTab === "Budget" ? "text-white" : "text-gray-500"
              }`}
            />
            Költségek
          </button>
        </li>
        <li>
          <button
            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
              activeTab === "GuestList"
                ? "text-white bg-custom-pink"
                : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("GuestList")}
          >
            <FaUsers
              className={`w-4 h-4 me-2 ${
                activeTab === "GuestList" ? "text-white" : "text-gray-500"
              }`}
            />
            Vendégek
          </button>
        </li>
        <li>
          <button
            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
              activeTab === "FavoriteSongs"
                ? "text-white bg-custom-pink"
                : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("FavoriteSongs")}
          >
            <FaMusic
              className={`w-4 h-4 me-2 ${
                activeTab === "FavoriteSongs" ? "text-white" : "text-gray-500"
              }`}
            />
            Zenék
          </button>
        </li>
      </ul>
      <div className="p-6 bg-gray-50 text-medium text-gray-500 rounded-lg w-full">
        {renderContent()}
      </div>
      <button
        className="fixed bottom-4 right-4 p-3 bg-custom-pink text-white rounded-full shadow-lg hover:bg-custom-pink-dark focus:outline-none focus:bg-custom-pink-dark transition duration-300"
        onClick={scrollToTop}
      >
        <FaArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
}

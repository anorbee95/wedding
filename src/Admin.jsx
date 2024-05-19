import { useState } from "react";
import { FaTasks, FaDollarSign, FaUsers, FaMusic } from "react-icons/fa";
import TodoList from "./components/admin/TodoList";
import GuestList from "./components/admin/GuestList";
import FavoriteSongs from "./components/admin/FavSongs";
import BudgetPlanner from "./components/admin/BudgetPlanner";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("Todos");

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
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen min-w-screen md:flex bg-gray-50">
      <ul className="flex flex-col space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
        <li>
          <button
            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
              activeTab === "Todos"
                ? "text-white bg-custom-pink"
                : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
            onClick={() => setActiveTab("Todos")}
          >
            <FaTasks
              className={`w-4 h-4 me-2 ${
                activeTab === "Todos"
                  ? "text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            />
            Teendők
          </button>
        </li>
        <li>
          <button
            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
              activeTab === "Budget"
                ? "text-white bg-custom-pink"
                : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
            onClick={() => setActiveTab("Budget")}
          >
            <FaDollarSign
              className={`w-4 h-4 me-2 ${
                activeTab === "Budget"
                  ? "text-white"
                  : "text-gray-500 dark:text-gray-400"
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
                : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
            onClick={() => setActiveTab("GuestList")}
          >
            <FaUsers
              className={`w-4 h-4 me-2 ${
                activeTab === "GuestList"
                  ? "text-white"
                  : "text-gray-500 dark:text-gray-400"
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
                : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
            onClick={() => setActiveTab("FavoriteSongs")}
          >
            <FaMusic
              className={`w-4 h-4 me-2 ${
                activeTab === "FavoriteSongs"
                  ? "text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            />
            Zenék
          </button>
        </li>
      </ul>
      <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        {renderContent()}
      </div>
    </div>
  );
}

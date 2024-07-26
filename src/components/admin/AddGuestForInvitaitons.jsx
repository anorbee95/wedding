import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";

export default function AddGuestForInvitations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keepOpen, setKeepOpen] = useState(false);
  const [guestData, setGuestData] = useState({
    name: "",
    isAdult: true,
    priority: 0,
    team: "",
    guestOf: "Démi",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggleChange = () => {
    setKeepOpen((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "invitations"), guestData);
      toast("Sikeresen hozzáadva!");
      if (!keepOpen) {
        setIsModalOpen(false);
      }
      setGuestData({
        name: "",
        isAdult: true,
        priority: 0,
        team: "",
        guestOf: "Démi",
      });
    } catch (error) {
      console.error("Error adding guest: ", error);
      toast("Nem sikerült hozzáadni a vendéget. Próbáld újra később.");
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-2 md:px-4 py-2 text-[10px] bg-custom-pink hover:bg-red-900 text-white rounded"
      >
        Vendég hozzáadása
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Vendég hozzáadása</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Név</label>
                <input
                  type="text"
                  name="name"
                  value={guestData.name}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Kor</label>
                <select
                  name="isAdult"
                  value={guestData.isAdult ? "true" : "false"}
                  onChange={(e) =>
                    handleInputChange({
                      target: {
                        name: "isAdult",
                        value: e.target.value === "true",
                      },
                    })
                  }
                  className="p-2 border border-gray-300 rounded w-full"
                >
                  <option value="true">Felnőtt</option>
                  <option value="false">Gyerek</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Prioritás</label>
                <select
                  name="priority"
                  value={guestData.priority}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded w-full"
                >
                  {[0, 1, 2, 3, 4, 5].map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Csapat</label>
                <input
                  type="text"
                  name="team"
                  value={guestData.team}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Vendég</label>
                <select
                  name="guestOf"
                  value={guestData.guestOf}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded w-full"
                >
                  <option value="Démi">Démi</option>
                  <option value="Norbi">Norbi</option>
                </select>
              </div>
              <div className="mb-4 flex justify-end items-center">
                <input
                  type="checkbox"
                  id="keepOpen"
                  checked={keepOpen}
                  onChange={handleToggleChange}
                  className="mr-2"
                />
                <label htmlFor="keepOpen" className="text-gray-700 text-xs">
                  Több hozzáadása
                </label>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 mr-2 bg-gray-400 text-white rounded"
                >
                  Mégse
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-custom-pink text-white rounded hover:bg-red-900"
                >
                  Mentés
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

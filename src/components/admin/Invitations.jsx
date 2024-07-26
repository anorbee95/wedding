import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import AddGuestForInvitations from "./AddGuestForInvitaitons";
import { toast } from "react-toastify";
import isGuestInRSVPs from "../../services/isGuestInRSVPs";

export default function Invitations() {
  const [guests, setGuests] = useState([]);
  const [RSVPs, setRSVPs] = useState([]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showSentInvitations, setShowSentInvitations] = useState(true);
  const [guestOfFilter, setGuestOfFilter] = useState("Összes");

  useEffect(() => {
    const fetchGuests = async () => {
      const querySnapshot = await getDocs(collection(db, "guests"));
      setRSVPs(querySnapshot.docs.map((doc) => doc.data()));
    };

    fetchGuests();
  }, []);

  useEffect(() => {
    const fetchGuests = async () => {
      const querySnapshot = await getDocs(collection(db, "invitations"));
      setGuests(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchGuests();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleUpdateGuest = async (guestId, updatedData) => {
    try {
      const guestDoc = doc(db, "invitations", guestId);
      await updateDoc(guestDoc, updatedData);
      setGuests((prevGuests) =>
        prevGuests.map((guest) =>
          guest.id === guestId ? { ...guest, ...updatedData } : guest
        )
      );
    } catch (error) {
      toast.error("Hiba: ", error);
    }
  };

  const sortedGuests = [...guests].sort((a, b) => {
    if (sortConfig.key) {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  const filteredGuests = sortedGuests.filter((guest) => {
    const matchesSearch =
      guest.name.toLowerCase().includes(search.toLowerCase()) ||
      guest.team.toLowerCase().includes(search.toLowerCase());
    const matchesGuestOf =
      guestOfFilter === "Összes" || guest.guestOf === guestOfFilter;
    return matchesSearch && matchesGuestOf;
  });

  const guestsReceived = filteredGuests.filter(
    (guest) => guest.isInvited === true
  ).length;

  const toggleShowSentInvitations = () => {
    setShowSentInvitations((prev) => !prev);
  };

  return (
    <div className="mx-auto text-xs md:text-base lg:max-w-[80%] md:p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 font-gilda font-bold">
          <h2 className="text-2xl md:text-4xl">Meghívók</h2>
          <span className="text-sm md:text-3xl">
            ({guestsReceived}/{filteredGuests.length})
          </span>
        </div>
        <AddGuestForInvitations />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Vendégek keresése..."
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="mb-4 flex justify-between items-center">
        <label className="inline-flex items-center cursor-pointer">
          <input
            id="invited"
            type="checkbox"
            checked={!showSentInvitations}
            onChange={toggleShowSentInvitations}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-custom-pink-transparent peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-custom-pink"></div>
          <span className="ml-2 text-[8px] md:text-xs mt-1 font-gilda font-semibold">
            Meghívott vendégek elrejtése
          </span>
        </label>
        <select
          value={guestOfFilter}
          onChange={(e) => setGuestOfFilter(e.target.value)}
          className="py-1 px-3 border text-xs md:text-sm border-gray-300 rounded"
        >
          <option value="Összes">Összes vendég</option>
          <option value="Démi">Démi vendégei</option>
          <option value="Norbi">Norbi vendégei</option>
        </select>
      </div>
      <div className="rounded-md overflow-x-scroll">
        <table className="min-w-full bg-white font-gilda">
          <thead className="text-left bg-custom-pink text-gray-50">
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="p-2 border-b cursor-pointer"
              >
                Név
              </th>
              <th
                onClick={() => handleSort("isAdult")}
                className="p-2 border-b cursor-pointer"
              >
                Felnőtt
              </th>
              <th
                onClick={() => handleSort("priority")}
                className="p-2 border-b cursor-pointer"
              >
                Prioritás
              </th>
              <th
                onClick={() => handleSort("team")}
                className="p-2 border-b cursor-pointer xl:w-20"
              >
                Csapat
              </th>
              <th className="p-2 border-b text-center xl:w-32">Meghívó</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuests
              .filter((guest) =>
                showSentInvitations ? true : !guest.isInvited
              )
              .map((guest) => (
                <tr key={guest.id} className={`border-t hover:bg-gray-50`}>
                  <td className="p-2">
                    <input
                      type="text"
                      value={guest.name}
                      onChange={(e) =>
                        handleUpdateGuest(guest.id, { name: e.target.value })
                      }
                      className={`p-1 border border-gray-300 rounded min-w-32 w-full ${
                        isGuestInRSVPs(guest.name, RSVPs) === "N/A"
                          ? "hover:bg-gray-50"
                          : isGuestInRSVPs(guest.name, RSVPs)
                          ? "bg-green-300 bg-opacity-50"
                          : "bg-red-300 bg-opacity-50"
                      }`}
                    />
                  </td>
                  <td className="p-2">
                    <select
                      value={guest.isAdult ? "Felnőtt" : "Gyerek"}
                      onChange={(e) =>
                        handleUpdateGuest(guest.id, {
                          isAdult: e.target.value === "Felnőtt",
                        })
                      }
                      className="p-1 border border-gray-300 rounded min-w-20 w-full"
                    >
                      <option value="Felnőtt">Felnőtt</option>
                      <option value="Gyerek">Gyerek</option>
                    </select>
                  </td>
                  <td className="p-2">
                    <select
                      value={guest.priority}
                      onChange={(e) =>
                        handleUpdateGuest(guest.id, {
                          priority: Number(e.target.value),
                        })
                      }
                      className="p-1 border border-gray-300 rounded w-full"
                    >
                      {[0, 1, 2, 3, 4, 5].map((priority) => (
                        <option key={priority} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2">{guest.team}</td>
                  <td className="p-2 flex justify-center items-center mt-1">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="invited"
                        type="checkbox"
                        checked={guest.isInvited || false}
                        onChange={(e) =>
                          handleUpdateGuest(guest.id, {
                            isInvited: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-custom-pink-transparent peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-custom-pink"></div>
                    </label>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

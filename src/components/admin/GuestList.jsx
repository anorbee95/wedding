import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showComing, setShowComing] = useState(true);

  useEffect(() => {
    const fetchGuests = async () => {
      const querySnapshot = await getDocs(collection(db, "guests"));
      setGuests(querySnapshot.docs.map((doc) => doc.data()));
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

  const filteredGuests = sortedGuests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(search.toLowerCase()) ||
      guest.email.toLowerCase().includes(search.toLowerCase())
  );

  const countGuests = (guest) => {
    let count = 1;
    if (guest.guests === "partner" && guest.partnerName) {
      count += 1;
    }
    if (guest.guests === "family") {
      for (let i = 1; i <= 7; i++) {
        if (guest[`member${i}`]) {
          count += 1;
        }
      }
    }
    return count;
  };

  const comingGuests = filteredGuests.filter((guest) => guest.rsvp);
  const canceledGuests = filteredGuests.filter((guest) => !guest.rsvp);

  const totalComingGuests = comingGuests.reduce((acc, guest) => acc + countGuests(guest), 0);

  const renderMealPreferences = (preferences) => {
    return preferences.length > 0 ? preferences.join(", ") : "Nincs";
  };

  return (
    <div className="mx-auto text-xs md:text-base lg:max-w-[80%] md:p-4">
      <h2 className="text-4xl font-gilda font-bold mb-4">Vendéglista</h2>
      <div className="flex mb-4">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showComing}
            onChange={() => setShowComing(!showComing)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-custom-pink"></div>
          <span className="ms-3 text-sm font-medium">
            {showComing ? `${totalComingGuests} fő jön` : `${canceledGuests.length} fő nem jön`}
          </span>
        </label>
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
      {showComing ? (
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
                  onClick={() => handleSort("email")}
                  className="p-2 border-b cursor-pointer"
                >
                  Email cím
                </th>
                <th
                  onClick={() => handleSort("guests")}
                  className="p-2 border-b cursor-pointer"
                >
                  Kikkel jön
                </th>
                <th className="p-2 border-b">Ételintoleranciák</th>
                <th className="p-2 border-b">Többiek</th>
              </tr>
            </thead>
            <tbody>
              {comingGuests.map((guest, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-2">{guest.name}</td>
                  <td className="p-2">{guest.email}</td>
                  <td className="p-2">{guest.guests === "solo" ? "egyedül" : guest.guests === "partner" ? "párjával" : "családdal"}</td>
                  <td className="p-2">
                    {renderMealPreferences(guest.mealPreferences)}
                  </td>
                  <td className="p-2">
                    {guest.guests === "partner" && guest.partnerName && (
                      <div>
                        <strong>Pár:</strong> {guest.partnerName} <br />
                        <strong>Ételintoleranciák:</strong>{" "}
                        {renderMealPreferences(guest.partnerMealPreferences)}
                      </div>
                    )}
                    {guest.guests === "family" && (
                      <div>
                        {Array.from({ length: 7 }).map((_, i) => {
                          const memberKey = `member${i + 1}`;
                          const mealPrefKey = `mealPref${i + 1}`;
                          return guest[memberKey] ? (
                            <div key={i}>
                              <strong>Rokon {i + 1}:</strong> {guest[memberKey]}{" "}
                              <br />
                              <strong>Ételintoleranciák:</strong>{" "}
                              {renderMealPreferences(guest[mealPrefKey])}
                            </div>
                          ) : null;
                        })}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-md overflow-hidden">
          <table className="min-w-full bg-white font-gilda">
            <thead className="text-left bg-custom-pink text-gray-50">
              <tr>
                <th
                  onClick={() => handleSort("name")}
                  className="p-2 border-b cursor-pointer"
                >
                  Név
                </th>
              </tr>
            </thead>
            <tbody>
              {canceledGuests.map((guest, index) => (
                <tr key={index} className="border-t hover:bg-gray-100">
                  <td className="p-2">{guest.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GuestList;
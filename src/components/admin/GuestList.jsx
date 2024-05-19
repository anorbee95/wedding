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

  const comingGuests = filteredGuests.filter((guest) => guest.rsvp);
  const canceledGuests = filteredGuests.filter((guest) => !guest.rsvp);

  const renderMealPreferences = (preferences) => {
    return preferences.length > 0 ? preferences.join(", ") : "None";
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Guest List</h2>
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name or email"
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={() => setShowComing(true)}
          className={`mr-2 p-2 rounded ${
            showComing ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Coming Guests
        </button>
        <button
          onClick={() => setShowComing(false)}
          className={`p-2 rounded ${
            !showComing ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Canceled Guests
        </button>
      </div>
      <div className="mb-4">
        <p>
          <strong>Number of Guests Coming:</strong> {comingGuests.length}
        </p>
        <p>
          <strong>Number of Guests Canceled:</strong> {canceledGuests.length}
        </p>
      </div>
      {showComing ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="text-left">
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="p-2 border-b cursor-pointer"
              >
                Name
              </th>
              <th
                onClick={() => handleSort("email")}
                className="p-2 border-b cursor-pointer"
              >
                Email
              </th>
              <th
                onClick={() => handleSort("guests")}
                className="p-2 border-b cursor-pointer"
              >
                Guests
              </th>
              <th className="p-2 border-b">Meal Preferences</th>
              <th className="p-2 border-b">Partner/Family</th>
            </tr>
          </thead>
          <tbody>
            {comingGuests.map((guest, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{guest.name}</td>
                <td className="p-2">{guest.email}</td>
                <td className="p-2">{guest.guests}</td>
                <td className="p-2">
                  {renderMealPreferences(guest.mealPreferences)}
                </td>
                <td className="p-2">
                  {guest.guests === "partner" && guest.partnerName && (
                    <div>
                      <strong>Partner:</strong> {guest.partnerName} <br />
                      <strong>Preferences:</strong>{" "}
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
                            <strong>Member {i + 1}:</strong> {guest[memberKey]}{" "}
                            <br />
                            <strong>Preferences:</strong>{" "}
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
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="text-left">
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="p-2 border-b cursor-pointer"
              >
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {canceledGuests.map((guest, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{guest.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GuestList;

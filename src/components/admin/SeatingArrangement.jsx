import { useState, useEffect, useRef } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { CiSquareRemove } from "react-icons/ci";

const initialSeating = {
  tables: [
    { chairs: Array(18).fill({ guest: null }) },
    { chairs: Array(18).fill({ guest: null }) },
    { chairs: Array(18).fill({ guest: null }) },
    { chairs: Array(18).fill({ guest: null }) },
    { chairs: Array(18).fill({ guest: null }) },
    { chairs: Array(18).fill({ guest: null }) },
  ],
};

const SeatingArrangement = () => {
  const [guests, setGuests] = useState([]);
  const [seating, setSeating] = useState(initialSeating);
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [selectedChair, setSelectedChair] = useState(null);
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [search, setSearch] = useState("");
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchGuests = async () => {
      const querySnapshot = await getDocs(collection(db, "guests"));
      const guestList = querySnapshot.docs.map((doc) => doc.data());
      setGuests(guestList.sort((a, b) => a.name.localeCompare(b.name)));
    };

    fetchGuests();
  }, []);

  useEffect(() => {
    const fetchSeating = async () => {
      const querySnapshot = await getDocs(collection(db, "seating"));
      setSeating(querySnapshot.docs[0].data());
    };

    fetchSeating();
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredGuests(
        guests.filter((guest) =>
          guest.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredGuests(guests);
    }
  }, [search, guests]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowGuestPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChairClick = (tableIndex, chairIndex) => {
    setSelectedChair({ tableIndex, chairIndex });
    setShowGuestPopup(true);
  };

  const handleGuestSelect = async (guest) => {
    const newSeating = { ...seating };
    newSeating.tables[selectedChair.tableIndex].chairs[
      selectedChair.chairIndex
    ].guest = guest;
    setSeating(newSeating);
    setShowGuestPopup(false);

    // Update Firebase
    const seatingDoc = doc(db, "seating", "seatingData");
    await updateDoc(seatingDoc, newSeating);
  };

  const handleGuestRemove = async (tableIndex, chairIndex) => {
    const newSeating = { ...seating };
    newSeating.tables[tableIndex].chairs[chairIndex].guest = null;
    setSeating(newSeating);

    // Update Firebase
    const seatingDoc = doc(db, "seating", "seatingData");
    await updateDoc(seatingDoc, newSeating);
  };

  const assignedGuests = seating.tables
    ?.flatMap((table) => table.chairs.map((chair) => chair.guest))
    ?.filter((guest) => guest !== null);

  const availableGuests = filteredGuests.filter(
    (guest) => !assignedGuests.find((ag) => ag?.name === guest.name)
  );

  return (
    <div className="p-4 flex flex-col justify-start md:justify-center items-start md:items-center overflow-scroll">
      <div className="ml-[21.8rem] md:m-0 flex flex-col justify-center items-center">
        <h1 className="text-4xl -ml-11 mb-4 font-gilda font-bold">Ülésrend</h1>
        <div className="flex justify-center items-center -ml-11">
          <div
            className={h-20 w-20 bg-chair bg-contain bg-center bg-no-repeat text-[10px] text-center flex justify-center items-center cursor-pointer mb-2}
          >
            <p className="mt-4 text-base">Démi</p>
          </div>
          <div
            className={h-20 w-20 bg-chair bg-contain bg-center bg-no-repeat text-[10px] text-center flex justify-center items-center cursor-pointer mb-2}
          >
            <p className="mt-4 text-base">Norbi</p>
          </div>
        </div>
        <div className="w-64 h-16 -ml-11 mb-8 border rounded border-gray-500 flex items-center justify-center">
          <p className="font-gilda text-2xl text-custom-pink">
            Bukovszki Birtok
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        {seating.tables.map((table, tableIndex) => (
          <>
            <div key={tableIndex} className="flex flex-col m-2">
              {table.chairs.map((chair, chairIndex) => (
                <div
                  key={chairIndex}
                  className={h-20 w-20 bg-chair bg-contain bg-center bg-no-repeat ${
                    tableIndex % 2 ? "rotate-90" : "-rotate-90"
                  } text-[10px] text-center flex justify-center items-center cursor-pointer mb-2 relative}
                  onClick={() => handleChairClick(tableIndex, chairIndex)}
                >
                  <p
                    className={mt-4 w-10 ${
                      tableIndex % 2 ? "-rotate-90" : "rotate-90"
                    }}
                  >
                    {chair.guest ? chair.guest.name : "Szabad"}
                  </p>
                  {chair.guest && (
                    <button
                      className="absolute -top-4 right-7 text-red-500 text-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGuestRemove(tableIndex, chairIndex);
                      }}
                    >
                      <CiSquareRemove />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div
              className={${
                tableIndex % 2
                  ? "w-12"
                  : "min-h-screen h-[1600px] w-16 rounded border border-gray-500"
              }}
            />
          </>
        ))}
      </div>
      {showGuestPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div
            ref={popupRef}
            className="bg-white bg-opacity-80 md:ml-52 min-w-[30%] min-h-[50%] p-4 rounded shadow-lg max-h-[80vh] overflow-y-auto w-80"
          >
            <h2 className="font-gilda text-custom-pink text-3xl md:text-4xl font-bold my-4">
              Vendég ideültetése
            </h2>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Keress a vedégek között..."
              className="mb-2 p-2 w-full border opacity-80 border-gray-300 rounded"
            />
            {availableGuests.map((guest, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer rounded-md bg-custom-pink bg-opacity-20 hover:bg-opacity-60 hover:text-white my-1"
                onClick={() => handleGuestSelect(guest)}
              >
                {guest.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatingArrangement;

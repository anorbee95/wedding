import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";

const FavoriteSongs = () => {
  const [uniqueSongs, setUniqueSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  useEffect(() => {
    const fetchSongs = async () => {
      const querySnapshot = await getDocs(collection(db, "songs"));
      const fetchedSongs = querySnapshot.docs.map((doc) => doc.data());

      const allSongs = [];
      fetchedSongs.forEach((songData) => {
        if (Array.isArray(songData.favSongs)) {
          songData.favSongs.forEach((favSong) => {
            allSongs.push({ ...favSong, guest: songData.guest });
          });
        }
      });

      const songCounts = allSongs.reduce((acc, song) => {
        const key = `${song.name || "Unknown"}-${song.artists[0].name || "Unknown"}`;
        if (acc[key]) {
          acc[key].count += 1;
          acc[key].guests.push(song.guest);
        } else {
          acc[key] = {
            ...song,
            count: 1,
            name: song.name || "Unknown",
            artist: song.artists[0].name || "Unknown",
            guests: [song.guest],
          };
        }
        return acc;
      }, {});

      setUniqueSongs(Object.values(songCounts));
    };

    fetchSongs();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedSongs = [...uniqueSongs].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredSongs = sortedSongs.filter(
    (song) =>
      (song.name && song.name.toLowerCase().includes(search.toLowerCase())) ||
      (song.artists[0].name && song.artists[0].name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Favorite Songs</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search songs..."
          value={search}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th
              onClick={() => handleSortChange("name")}
              className="cursor-pointer p-2 border-b"
            >
              Name
            </th>
            <th
              onClick={() => handleSortChange("artist")}
              className="cursor-pointer p-2 border-b"
            >
              Artist
            </th>
            <th
              onClick={() => handleSortChange("count")}
              className="cursor-pointer p-2 border-b"
            >
              Count
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredSongs.map((song, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-2 border-b">{song.name}</td>
              <td className="p-2 border-b">{song.artists[0].name}</td>
              <td className="p-2 border-b">
                <Tooltip
                  title={`Submitted by: ${song.guests.join(", ")}`}
                  position="top"
                  trigger="mouseenter"
                  arrow={true}
                  theme="light"
                >
                  {song.count}
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavoriteSongs;

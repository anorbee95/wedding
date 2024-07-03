import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { MdFavorite, MdRemoveCircle } from "react-icons/md";
import { GrPrevious, GrNext } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { createSong } from "../../services/song/createSong";
import { Link } from "react-router-dom";
import ThankYou from "./ThankYou";

export default function SpotifyFavorites() {
  const [accessToken, setAccessToken] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const clientId = import.meta.env.VITE_ClientID;
  const clientSecret = import.meta.env.VITE_ClientSecret;

  useEffect(() => {
    const fetchAccessToken = async () => {
      const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      };

      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          params,
          { headers }
        );
        setAccessToken(response.data.access_token);
      } catch (error) {
        toast.error("Error fetching access token", {
          position: "top-center",
          autoClose: 2000,
        });
        console.error("Error fetching access token", error);
      }
    };

    fetchAccessToken();
  }, [clientId, clientSecret]);

  const searchSongs = async (query, offset = 0) => {
    if (!accessToken) return;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        headers,
        params: {
          q: query,
          type: "track",
          limit: 10,
          offset: offset,
        },
      });
      setSongs(response.data.tracks.items);
      setTotal(response.data.tracks.total);
    } catch (error) {
      toast.error("Error searching songs", {
        position: "top-center",
        autoClose: 2000,
      });
      console.error("Error searching songs", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchSongs(searchQuery);
  };

  const handleAddFavorite = (song) => {
    if (!favorites.some((fav) => fav.id === song.id)) {
      if (favorites.length >= 10) {
        return toast.error("Max 10 számot választhatsz!", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setFavorites([...favorites, song]);
    } else {
      setFavorites((prev) => prev.filter((fav) => fav.id !== song.id));
    }
  };

  const handlePagination = (newOffset) => {
    setOffset(newOffset);
    searchSongs(searchQuery, newOffset);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsDetailsOpen(true);
  };

  const toggleDetails = () => {
    setIsDetailsOpen((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || favorites.length === 0) {
      return toast.error("Add meg a neved és válassz legalább egy számot!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
    try {
      const id = createSong({
        guest: name,
        favSongs: favorites,
        submitted: Date.now(),
      });
      if (id) {
        return setSubmitted(true);
      }
    } catch (err) {
      return toast.error(err, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      {submitted ? (
        <ThankYou />
      ) : (
        <div className="relative bg-gray-100">
          {!!favorites.length && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-4 px-4 pt-2.5 pb-1.5 2xl:px-10 2xl:py-5 bg-custom-pink text-white rounded-md shadow-md shadow-zinc-400 hover:bg-red-800"
            >
              Zenék beküldése
            </button>
          )}
          <div className="pt-6 flex justify-center mx-auto font-gilda">
            <Link
              to="/"
              className="cursor-pointer text-gray-500 text-lg text-center"
            >
              <span className="flex items-center gap-2">
                <GrPrevious className="text-sm" /> Vissza az oldalra
              </span>
            </Link>
          </div>
          <div className="overflow-visible min-h-screen md:w-[50%] p-2 md:p-8 mx-auto">
            <div className=" font-gilda bg-white p-6 rounded-lg shadow-md mb-8 z-50">
              <div
                onClick={toggleDetails}
                className="flex justify-between items-center font-medium text-gray-500 cursor-pointer"
              >
                <h2 className="sticky top-4 text-custom-pink text-2xl font-semibold">
                  A kedvenc számaid:
                  {!!favorites.length && (
                    <>
                      <br className="md:hidden" />
                      <span className="md:ml-4 text-sm font-thin text-gray-400">
                        ( kattints a részletekért )
                      </span>
                    </>
                  )}
                </h2>
                <span className="bg-custom-pink-transparent text-custom-pink font-bold text-md me-2 p-2.5 self-center rounded">
                  {favorites.length}
                </span>
              </div>
              {isDetailsOpen && (
                <div className={favorites.length ? "mt-4" : ""}>
                  {favorites.map((song) => (
                    <div
                      key={song.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg shadow-sm"
                    >
                      <div>
                        <p className="text-lg font-medium font-gilda">
                          {song.name}
                        </p>
                        <p className="text-sm text-gray-500 font-gilda">
                          {song.artists.map((artist) => artist.name).join(", ")}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAddFavorite(song)}
                        className="px-4 py-2 bg-custom-pink text-white font-semibold rounded-lg shadow-md hover:bg-red-800"
                      >
                        <MdRemoveCircle />
                      </button>
                    </div>
                  ))}
                  {!!favorites.length && (
                    <form
                      className="mt-4 mx-auto flex flex-col"
                      onSubmit={handleSubmit}
                    >
                      <div className="flex mb-2">
                        <span className="inline-flex items-center px-3 text-sm bg-custom-pink-transparent border border-e-0 border-gray-300 rounded-s-md">
                          <FaUserCircle className="text-custom-pink" />
                        </span>
                        <input
                          type="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-custom-pink focus:border-custom-pink block flex-1 min-w-0 w-full text-sm p-2.5"
                          placeholder="Írd be a neved..."
                          required
                        />
                      </div>
                      <button
                        className="peer block w-full rounded-md border text-white bg-custom-pink border-custom-pink py-2 px-3 text-md outline-custom-pink"
                        type="submit"
                      >
                        Kedvenc számaid beküldése!
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <form
                onSubmit={handleSearchSubmit}
                className="font-gilda flex items-center space-x-4 mb-4"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Keress rá a kedvenc zenéidre..."
                  className="w-full pt-2.5 pb-1.5 px-2 border border-gray-300 rounded-lg"
                />
                <button
                  type="submit"
                  className="px-4 pt-2.5 pb-1.5 bg-custom-pink-transparent text-white font-semibold rounded-lg shadow-md hover:bg-custom-pink"
                >
                  Keresés
                </button>
              </form>

              <div className="space-y-4">
                {songs.map((song) => (
                  <div
                    key={song.id}
                    className="font-gilda flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div>
                      <div>
                        <p className="text-lg font-medium">{song.name}</p>
                        <p className="text-sm text-gray-500">
                          {song.artists.map((artist) => artist.name).join(", ")}
                        </p>
                      </div>
                      <iframe
                        className="mt-2 h-20"
                        src={`https://open.spotify.com/embed/track/${song.uri.slice(
                          14
                        )}`}
                        width="250"
                        height="150"
                        allow="encrypted-media"
                      ></iframe>
                    </div>
                    <button
                      onClick={() => handleAddFavorite(song)}
                      className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md hover:bg-red-900 ${
                        favorites.includes(song)
                          ? "bg-red-900"
                          : "bg-custom-pink"
                      }`}
                    >
                      <MdFavorite />
                    </button>
                  </div>
                ))}
              </div>

              {!!total && (
                <div className="flex flex-col justify-center gap-4 items-center mt-4">
                  <div className="text-sm text-custom-pink-transparent">
                    <span className="font-semibold text-custom-pink">
                      {offset + 1}
                    </span>
                    -
                    <span className="font-semibold text-custom-pink">
                      {offset + 10}
                    </span>
                    -ig mutatása a{" "}
                    <span className="font-semibold text-custom-pink">
                      {total + " "}
                    </span>
                    találatból
                  </div>
                  <div className="flex justify-center gap-4 items-center">
                    <button
                      onClick={() => handlePagination(offset - 10)}
                      disabled={offset === 0}
                      className={`px-4 py-2 rounded-lg shadow-md ${
                        offset === 0
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-custom-pink-transparent text-white hover:bg-custom-pink"
                      }`}
                    >
                      <GrPrevious />
                    </button>
                    <button
                      onClick={() => handlePagination(offset + 10)}
                      disabled={offset + 10 >= total}
                      className={`px-4 py-2 rounded-lg shadow-md ${
                        offset + 10 >= total
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-custom-pink-transparent text-white hover:bg-custom-pink"
                      }`}
                    >
                      <GrNext />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-center" closeOnClick rtl={false} />
    </>
  );
}

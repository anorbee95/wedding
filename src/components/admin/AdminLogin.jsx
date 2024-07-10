import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const correctPasscode = "Butyike2025";
    if (passcode === correctPasscode) {
      localStorage.setItem("passcode", passcode);
      navigate("/admin");
    } else {
      setError("Helytelen jelszó. Próbáld újra, vagy szólj Norbinak!");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-pink-transparent">
      <div className="p-6 mx-4 max-w-sm md:mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-5xl md:text-6xl text-center font-alex-brush text-custom-pink">
          Démi & Norbi
        </h1>
        <h2 className="text-center text-2xl font-gilda font-bold text-custom-pink">
          Admin bejelentkezés
        </h2>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Írd be a jelszót..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={handleLogin}
          className="w-full px-3 py-2 bg-custom-pink text-white rounded-md hover:bg-custom-pink-transparent"
        >
          Bejelentkezés
        </button>
        {error && (
          <p className="text-center text-red-500 text-xs md:text-sm">{error}</p>
        )}
      </div>
    </div>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Admin from "./Admin.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SpotifyFavorites from "./components/music/FavouriteSongs.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import AdminLogin from "./components/admin/AdminLogin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:guest",
    element: <App />,
  },
  {
    path: "/zene",
    element: <SpotifyFavorites />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <AdminLogin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

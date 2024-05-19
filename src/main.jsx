import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import Admin from './Admin.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SpotifyFavorites from './components/music/FavouriteSongs.jsx'

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
    path: "/music",
    element: <SpotifyFavorites />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
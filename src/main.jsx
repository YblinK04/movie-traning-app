import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import theme from "../theme.js";
import Home from "./Pages/Home.jsx";
import Movies from "./Pages/movies/Movies.jsx";
import Shows from "./pages/shows/Shows.jsx";
import Search from "./pages/search/Search.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import Watchlist from "./Pages/Watchlist.jsx";
import Protected from "./components/routes/Protected.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: '/movies',
        element: <Movies />
      },
      {
        path: '/shows',
        element: <Shows />
      },
      {
        path: '/search',
        element: <Search />
      },
      {
        path: "/:type/:id",
        element: <DetailsPage />
      },
      {
        path: "/watchlist",
        element: ( 
          <Protected>
            <Watchlist />
          </Protected>

        )
      }
      

    ],
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
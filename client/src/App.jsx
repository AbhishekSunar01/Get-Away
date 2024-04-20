import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPlaces from "./pages/AddPlaces";
import axios from "axios";
import Profile from "./pages/Profile";
import { UserContextProvider } from "./util/UserContext";
import PropertyDetail from "./containers/PropertyDetail";
import Bookings from "./pages/Bookings";
import UpdatePlace from "./pages/UpdatePlace";
import { SearchContextProvider } from "./util/SearchContext";
import History from "./pages/History";
import Payment from "./pages/Payment";

axios.defaults.baseURL = "http://localhost:4000/api/";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <UserContextProvider>
      <SearchContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addPlace" element={<AddPlaces />} />
            <Route path="/updatePlace/:id" element={<UpdatePlace />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/history" element={<History />} />
            <Route path="/payment" element={<Payment />} />
          </Route>
        </Routes>
      </SearchContextProvider>
    </UserContextProvider>
  );
}

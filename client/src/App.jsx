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

axios.defaults.baseURL = "http://localhost:4000/api/";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Outlets */}
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addPlace" element={<AddPlaces />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

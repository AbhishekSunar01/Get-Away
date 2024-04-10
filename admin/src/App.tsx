import { ThemeProvider } from "@/components/theme-provider";
import { Login } from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Users from "./pages/Users";
import Properties from "./pages/Properties";
import Bookings from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:4000/api/admin";
  axios.defaults.withCredentials = true;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="properties" element={<Properties />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

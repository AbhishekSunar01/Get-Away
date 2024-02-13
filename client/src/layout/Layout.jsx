import { Outlet } from "react-router-dom";
import Header from "../containers/Header";
import Footer from "../containers/Footer";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="md:mx-48 mb-12 flex-1">
        <Outlet />
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

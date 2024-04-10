import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";

export default function MenuBar() {
  const logout = async () => {
    await axios.post("/logout");
    localStorage.removeItem("adminToken");
  };

  return (
    <div className="flex w-full justify-between py-6 md:px-48">
      <div className="font-bold text-2xl">Getaway Admin</div>
      <Menubar className="w-fit">
        <MenubarMenu>
          <MenubarTrigger>
            <NavLink
              to="/admin/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "underline text-primary" : ""
              }
            >
              Dashboard
            </NavLink>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <NavLink
              to="/admin/users"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "underline text-primary" : ""
              }
            >
              Users
            </NavLink>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <NavLink
              to="/admin/properties"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "underline text-primary" : ""
              }
            >
              Properties
            </NavLink>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <NavLink
              to="/admin/bookings"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "underline text-primary" : ""
              }
            >
              Bookings
            </NavLink>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
      <div className="flex gap-4">
        <ModeToggle />
        <Button onClick={logout}>
          <Link to="/">Logout</Link>
        </Button>
      </div>
    </div>
  );
}

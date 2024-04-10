import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return (
    <div>
      <div className="border border-black">Hello world</div>
      <Outlet />
    </div>
  );
}

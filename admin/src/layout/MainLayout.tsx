import { Separator } from "@/components/ui/separator";
import MenuBar from "@/containers/MenuBar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function MainLayout() {
  return (
    <div className="h-screen">
      <MenuBar />
      <Separator orientation="horizontal" />
      <Outlet />
      <Toaster />
    </div>
  );
}

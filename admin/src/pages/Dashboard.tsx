import { Chart } from "@/components/chart";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Users, Hotel, SwatchBook } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  type CardProps = {
    users: number;
    properties: number;
    bookings: number;
  };

  const [data, setData] = useState<CardProps>({
    users: 0,
    properties: 0,
    bookings: 0,
  });

  const fetchDashboardData = async () => {
    try {
      axios.get("/count").then((response) => {
        setData(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="md:mx-48 mx-6 pt-6">
      <div className="font-bold text-[4rem] ">Dashboard</div>
      <div className="flex justify-between">
        <Card className="md:w-[350px] flex flex-col p-4">
          <div className="font-bold text-lg flex items-center gap-2">
            Users{" "}
            <span className="text-primary">
              <Users />
            </span>
          </div>
          <span className="text-sm">No of Users</span>
          <div className="text-[5rem] text-primary font-semibold flex items-center gap-4">
            {data && data.users}
          </div>
        </Card>

        <Card className="md:w-[350px] flex flex-col p-4">
          <div className="font-bold text-lg flex items-center gap-2">
            Properties{" "}
            <span className="text-primary">
              <Hotel />
            </span>
          </div>
          <span className="text-sm">No of Properties</span>
          <div className="text-[5rem] text-primary font-semibold flex items-center gap-4">
            {data?.properties}
          </div>
        </Card>

        <Card className="md:w-[350px] flex flex-col p-4">
          <div className="font-bold text-lg flex items-center gap-2">
            Bookings{" "}
            <span className="text-primary">
              <SwatchBook />
            </span>
          </div>
          <span className="text-sm">No of Bookings</span>
          <div className="text-[5rem] text-primary font-semibold flex items-center gap-4">
            {data?.bookings}
          </div>
        </Card>
      </div>

      <div className="font-bold text-[3rem] mt-6 mb-4">
        Popular Accommodations
      </div>
      <Chart />
    </div>
  );
}

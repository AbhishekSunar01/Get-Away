import axios from "axios";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function Chart() {
  type Property = {
    title: string;
    numberOfBookings: number;
    userName: string;
  };
  const [popularProperties, setPopularProperties] = useState<Property[]>([]);

  const fetchPopularProperties = async () => {
    try {
      const response = await axios.get("/popular");
      setPopularProperties(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPopularProperties();
  }, []);

  console.log(popularProperties);

  const data = popularProperties.map((property) => ({
    name: property.title,
    total: property.numberOfBookings,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

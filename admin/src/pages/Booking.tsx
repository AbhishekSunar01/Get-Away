import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Bookings() {
  type Booking = {
    propertyName: string;
    dates: {
      checkIn: string;
      checkOut: string;
    }[];
    totalAmount: number;
    bookingCount: number;
  };

  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchBookings = async () => {
    try {
      axios.get("/bookings").then((response) => {
        setBookings(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div className="w-[770px] mt-24">
        <Card>
          <div className="text-center font-semibold text-2xl pt-6 underline underline-offset-4 decoration-primary">
            Bookings
          </div>
          <div className="px-8 pb-4">
            <Table>
              <TableCaption>
                <span className="text-primary">List of Properties.</span>
              </TableCaption>
              <ScrollArea className="h-[325px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>S.no</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Check-in Date</TableHead>
                    <TableHead>Check-out Date</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead className="text-right">No of Bookings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking: Booking, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{booking.propertyName}</TableCell>

                      <TableCell>
                        {booking.dates.map((date, i) => (
                          <span key={i}>{date.checkIn}</span>
                        ))}
                      </TableCell>
                      <TableCell>
                        {booking.dates.map((date, i) => (
                          <span key={i}>{date.checkOut}</span>
                        ))}
                      </TableCell>
                      <TableCell>{booking.totalAmount}</TableCell>
                      <TableCell className="text-right">
                        {booking.bookingCount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </ScrollArea>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}

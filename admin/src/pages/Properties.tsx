import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Properties() {
  type Property = {
    id: number;
    title: string;
    price: string;
    address: string;
    userName: string;
  };

  const [properties, setProperties] = useState<Property[]>([]);

  const deleteProperty = async (id: number) => {
    try {
      axios.delete(`/properties/${id}`).then(() => {
        fetchProperties();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProperties = async () => {
    try {
      axios.get("/properties").then((response) => {
        setProperties(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div className="w-[670px] mt-24">
        <Card>
          <div className="text-center font-semibold text-2xl pt-6 underline underline-offset-4 decoration-primary">
            Properties
          </div>
          <div className="px-8 pb-4">
            <Table>
              <TableCaption>
                <div className="text-primary">List of Properties.</div>
              </TableCaption>
              <ScrollArea className="h-[325px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>S.no</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((property: Property, index) => (
                    <TableRow>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{property.title}</TableCell>
                      <TableCell>Rs. {property.price}</TableCell>
                      <TableCell>{property.address}</TableCell>
                      <TableCell>{property.userName}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger>
                            <Button size={"sm"}>Delete</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <DialogDescription>
                                By clicking on delete, you will delete the user{" "}
                                {property.title} and all the properties
                                associated with it.
                              </DialogDescription>
                              <DialogClose className="flex justify-end">
                                <Button
                                  size={"sm"}
                                  onClick={() => deleteProperty(property.id)}
                                >
                                  Delete
                                </Button>
                              </DialogClose>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
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

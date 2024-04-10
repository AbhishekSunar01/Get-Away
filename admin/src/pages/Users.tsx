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
import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  type User = {
    id: number;
    name: string;
    email: string;
    propertyCount: number;
  };

  const [users, setUsers] = useState<User[]>([]);

  const deleteUser = async (id: number) => {
    try {
      axios.delete(`/users/${id}`).then(() => {
        fetchUsers();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      axios.get("/users").then((response) => {
        setUsers(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div className="w-[620px] mt-24">
        <Card>
          <div className="text-center font-semibold text-2xl pt-6 underline underline-offset-4 decoration-primary">
            User
          </div>
          <div className="px-8 pb-4">
            <Table>
              <TableCaption>
                <div className="text-primary">List of Users</div>
              </TableCaption>
              <ScrollArea className="h-[325px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">S.no</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="">No. of properties</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user: User, index) => (
                    <TableRow>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.propertyCount}</TableCell>
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
                                {user.propertyCount > 0 ? (
                                  <div>
                                    By clicking on delete, you will delete the
                                    user {user.name} and all the properties
                                    associated with it.
                                  </div>
                                ) : (
                                  <div>
                                    Cannot Delete the User without property
                                  </div>
                                )}
                              </DialogDescription>
                              <DialogClose className="flex justify-end">
                                {user.propertyCount > 0 && (
                                  <Button
                                    size={"sm"}
                                    onClick={() => deleteUser(user.id)}
                                  >
                                    Delete
                                  </Button>
                                )}
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

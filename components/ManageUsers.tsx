"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";

import { useRoom } from "@liveblocks/react";
import { removeUserFromDocument } from "@/actions/actions";
import { toast } from "sonner";

import { useUser } from "@clerk/nextjs";
import useOwner from "@/lib/useOwner";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";

const ManageUsers = () => {
  const { user } = useUser();
  const isOwner = useOwner();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const rooms = useRoom();
  const router=useRouter()
  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", rooms.id))
  );

  const handleDelete = (userId: string) => {
    startTransition(async () => {
      if (!user) return;
      const { success } = await removeUserFromDocument(rooms.id, userId);
      if (success) {
        setIsOpen(false);
        if(!isOwner){router.push("/");}
        toast.success("User successfully removed to the room");
      } else {
        toast.error("Error removing User to the Room");
      }
    });
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline" color="#ffff">
          <DialogTrigger>Users ({usersInRoom?.docs.length})</DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Users with Access</DialogTitle>
            <DialogDescription>
              Below is the list of users who have access to this document.
            </DialogDescription>
          </DialogHeader>
          <hr className="my-2" />
          <div className="flex flex-col space-y-2">
            {usersInRoom?.docs.map((doc) => {
              return (
                <div
                  key={doc.data().userId}
                  className="flex items-center justify-between"
                >
                  <p className="font-light">
                    {doc.data().userId === user?.emailAddresses[0].toString()
                      ? `You (${doc.data().userId})`
                      : `${doc.data().userId}`}
                  </p>

                  <div className="flex items-center gap-2">
                    <Button variant="outline">{doc.data().role}</Button>
                    {isOwner &&
                      doc.data().userId !== user?.emailAddresses[0].toString() && (
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(doc.data().userId)}
                          disabled={isPending}
                          size="sm"
                        >
                          {isPending ? "Removing.." : "X"}
                        </Button>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUsers;
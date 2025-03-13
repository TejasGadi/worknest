"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";

import { useRoom } from "@liveblocks/react";
import { inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";

const InviteUsers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const rooms = useRoom();
  

  const handleInvite = async (e:FormEvent) => {
  e.preventDefault()

    startTransition(async () => {
      const { success } = await inviteUserToDocument(rooms.id,email);

      if (success) {
        setIsOpen(false);
        setEmail("")
        toast.success("User successfully added to the room")   
        
      }
      else{
        
        toast.error("Error Adding User to the Room")
      }
    });
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline" color="#ffff">
          <DialogTrigger>Invite  </DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite user to collaborate</DialogTitle>
            <DialogDescription>
             Enter the email of the user you want to invite.
            </DialogDescription>
          </DialogHeader>
          <div >
          <form
          className=" flex flex-col justify-between gap-2"
          onSubmit={handleInvite}>

            <Input
            type="email"
            placeholder="Email"
            className="w-full"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <Button type="submit" disabled={!email|| isPending} color="#0000">
                {isPending?"Inviting..":"Invite"}
            </Button>
            
          </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InviteUsers;
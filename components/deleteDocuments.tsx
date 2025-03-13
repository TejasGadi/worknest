"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState, useTransition } from "react"
import { Button } from "./ui/button"
import { DialogClose } from "@radix-ui/react-dialog"
import { useRoom } from "@liveblocks/react"
import { useRouter } from "next/navigation"
import { deleteDocuments } from "@/actions/actions"

const DeleteDocument = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const roomId= useRoom().id

    const handleDelete = async() =>{
        if(!roomId) return;

        startTransition( async()=>{
            const {success} = await deleteDocuments(roomId);

            if(success){
                setIsOpen(false)
                router.replace("/")
                // toast.success("Room Deleted successfully")
            }
            else{
                // toast.error("Failed to delete room")
            }
        })
    }
  return (
    <Dialog open={isOpen} onOpenChange={()=>setIsOpen(!isOpen)}>
        <Button asChild variant="destructive">
            <DialogTrigger>Delete</DialogTrigger>
        </Button>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Are you absolutely sure you want to Delete?</DialogTitle>
            <DialogDescription>
                This will delete the document and all its contents, removing all users from the document.
            </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-end gap-2">
                <Button 
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isPending}
                >
                    {isPending? "Deleting..." : "Confirm Delete"}
                </Button>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>

  )
}

export default DeleteDocument
'use client'
import { MenuIcon } from "lucide-react"
import NewDocumentButton from "./NewDocumentButton"
import { useCollection } from 'react-firebase-hooks/firestore';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { useUser } from "@clerk/nextjs";
import { collectionGroup,DocumentData, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import SidebarOption from "./SidebarOption";
  
interface RoomDocument extends DocumentData{
  createdAt:string,
  role : "owner"| "editor",
  roomId:string,
  userId: string
}

const Sidebar = () => {
  const {user} = useUser();

  const [groupedData, setgroupedData]=useState< {
    owner:RoomDocument[],
    editor:RoomDocument[]
  }>({
    owner:[],
    editor:[],
  });

  const [data, loading, error] = useCollection(
      user && (
          query(collectionGroup(db, 'rooms'), where('userId', '==', user.emailAddresses[0].toString()))
      )
  )
  useEffect(()=>{
    if(!data) return;

    const grouped= data.docs.reduce<{
      owner:RoomDocument[],
      editor:RoomDocument[]
    }>(
      (acc, curr)=>{
        const roomData=curr.data() as RoomDocument;
        if(roomData.role === "owner"){
          acc.owner.push({
            id:curr.id,
            ...roomData
          });
        }
        else{
          acc.editor.push({
            id:curr.id,
            ...roomData
            });
        }
        return acc;
      },{
        owner: [],
        editor: []
      }
    )
    setgroupedData(grouped);
  }, [data])

    const menuoptions=(
        
        <>
        <NewDocumentButton/>
        <div className=" max-w-24  flex flex-col py-4 space-y-4 md:max-w-36">
        {/* My Documents */}
        {groupedData.owner.length===0?(
          <h2 className="text-gray-500 font-semibold text-sm">
            No Documents found
          </h2>
        ):(
          <>
          <h2 className="text-gray-500 font-semibold text-sm">
            My Documents
          </h2>
          {groupedData.owner.map((doc, id)=>{
            return(
              
              <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
              
            )
          })}
          </>

        )}

        </div>
        {/* List  */}
       {/* Shared with me header*/}
       <div className="max-w-24  flex flex-col py-4 space-y-4 md:max-w-36 ">
       {groupedData.editor.length === 0 ? (
                <h2 className="text-gray-500 font-semibold text-sm">No Documents found</h2>
            ): (
                <>
                    <h2 className="text-gray-500 font-semibold text-sm">Shared with me</h2>
                    {groupedData.editor.map((doc, id)=>{
                        return (
                         
                          <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
                          
                        )
                    })}
                </>
            )}
            </div>
            

        </>
    );
  return (
    <div className="p-2 md:p-5  bg-gray-200 relative">
        <div className="md:hidden">
        <Sheet>
        <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg " size={40} />
        </SheetTrigger>
        <SheetContent side="left">
            <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <div>
                {menuoptions}
            </div>
            <SheetDescription>
               
            </SheetDescription>
            </SheetHeader>
        </SheetContent>
        </Sheet>
        </div>

        <div className="hidden md:inline md: m-1 ">
        {menuoptions}
        </div>
       
    </div>
    
  )
}

export default Sidebar
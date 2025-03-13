import { db } from "@/firebase"
import {useUser} from "@clerk/nextjs"
import { useRoom } from "@liveblocks/react/suspense"
import { collectionGroup, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"


const useOwner = () => {
  const {user} = useUser()
  const room = useRoom()
  const [isOwner, setIsOwner] = useState(false)
  const [usersinRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where ("roomId", "==", room.id))
  )

  useEffect(()=>{
    if(usersinRoom?.docs && usersinRoom.docs.length>0){
        const owners = usersinRoom.docs.filter((doc)=>doc.data().role === "owner")

        if(owners.some((owner)=>owner.data().userId === user?.emailAddresses[0].toString())){
            setIsOwner(true)
        }
    }
  }, [user, usersinRoom])

  return isOwner;
}

export default useOwner

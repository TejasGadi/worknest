"use server";
import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
  // Ensure the user is authenticated
  const { sessionClaims } = await auth();

  // Log the session claims to debug
  console.log("session claims", sessionClaims);

  // Extract the email from session claims
  const email = sessionClaims?.email;

  if (!email) {
    throw new Error("User email is missing in session claims");
  }
  console.log("email",email)
  // Proceed with Firestore operations
  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New doc",
  });

  await adminDb
    .collection("users")
    .doc(email)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: email,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
}

export async function deleteDocuments(roomId:string) {
  auth.protect()

  console.log("deleted",roomId)
  try{
    // deletes the dcuments itself
      await adminDb.collection('documents').doc(roomId).delete();

      const query= await adminDb
      .collectionGroup("rooms")
      .where("roomId","==",roomId)
      .get();

      console.log("query",query.docs)
      const batch = adminDb.batch()

      //delete the document room's refrence in the user's collection for every user in the collection 
      query.docs.forEach((doc)=>{
        batch.delete(doc.ref)
      })

      await batch.commit();
      await liveblocks.deleteRoom(roomId)
     
  }catch(error ){
    console.log("Error",error)
    return{success:false}
  }
  return {success:true}
}


export async function inviteUserToDocument(roomId:string, email:string){
  auth.protect()

  console.log("invite user to doc", roomId, email)
  try{
    await adminDb
    .collection("users")
    .doc(email)
    .collection("rooms")
    .doc(roomId)
    .set({
      userId: email,
      role: "editor",
      createdAt: new Date(),
      roomId: roomId,
    });
    return{success:true}
  }catch(e){
    console.log("Error",e)
    return{success:false}
  }
}

export async function removeUserFromDocument(roomId:string, email:string){
  auth.protect();
  console.log("remove user from doc", roomId, email);
  try{
    await adminDb.collection("users").doc(email).collection("rooms").doc(roomId).delete();
    
    return {success:true}
  }catch(e){
    console.log("Error",e);
    return {success:false}
  }
}
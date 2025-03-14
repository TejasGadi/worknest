"use client"
import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { useUser } from "@clerk/nextjs";
import { ArrowLeftCircle } from "lucide-react";


export default function Home() {
  const user = useUser()
  return (
    <>
    {user.isSignedIn? 
      (<>
          <Header/>
                <div className=" flex min-h-screen ">
                {/* sidebar */}
                <Sidebar/>
                <div className="flex-1 p-5 bg-gray-100 overflow-y-auto scrollbar-hidden">
                  {/* Children */}
                <main className="flex space-x-2 items-center animate-pulse">
                  <ArrowLeftCircle className="w-12 h-12" />
                  <h1 className="font-bold">Get started with creating a New Document</h1>
                </main>
                
                </div>
                </div>
            <Toaster position="top-center" />
      </>): 
    
    (
        <LandingPage/>
    )
    }
    </>
  );
}

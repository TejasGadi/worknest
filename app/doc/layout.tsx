import Header from "@/components/Header"
import LiveBlocksProvider from "@/components/LiveBlocksProvider"
import Sidebar from "@/components/Sidebar"
import { Toaster } from "@/components/ui/sonner"

const PageLayout = ({children}: {
    children: React.ReactNode
}) => {

  return (

    <>
      <Header/>
          <div className=" flex min-h-screen ">
          {/* sidebar */}
          <Sidebar/>
          <div className="flex-1 p-5 bg-gray-100 overflow-y-auto scrollbar-hidden">
            {/* Children */}
            <LiveBlocksProvider>
              {children}
            </LiveBlocksProvider>
          
          </div>
          </div>
      <Toaster position="top-center" />
    </>
    
  )
}

export default PageLayout

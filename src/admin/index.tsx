import { Button } from "@/components/ui/button";
import {Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import {Link, Outlet} from "react-router-dom";
import {useFetch} from "@/utils/hooks";

export {StationPage} from './Stations.tsx';
export {RoutePage} from './RoutePage.tsx';


const AdminPage = () => {
  // Check for admin role.

  const {isLoading, data:user, error } = useFetch<User>("api/v1/users/me");


  return (
    <main className="h-screen p-4">

      <AdminNav />

      {
        isLoading ? <p>Loading</p> : 
          error ? <span>{error.message}</span> : 
        <h1>Hello {user?.username} </h1>
      }


      <Outlet />
    </main>
  )

}

const AdminNav = () => {

  const links = [
    {
      label: "Stations",
      to: "stations",
    },
    {
      label: "Routes",
      to: "routes",
    },
    {
      label: "Buses",
      to: "buses",
    },
    {
      label: "Bookings",
      to: "bookings",
    },
  ]

  return (
    <Sheet> 
      
      <SheetTrigger asChild>
        <Button variant="outline">
          <HamburgerMenuIcon  className="w-3 h-3"/>
        </Button>

      </SheetTrigger>

      <SheetContent  side={"left"} className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>Manage</SheetTitle>
        </SheetHeader>
        
        <nav className="flex flex-col py-4 mt-16 text-xl font-medium space-y-8">
         {links.map((li) => (
            <SheetClose key={li.to} asChild>
              <Link  to={li.to} >{li.label}</Link>
            </SheetClose>
         ))}
        </nav>


       <SheetFooter className="flex flex-row items-end py-16 grow">
              <Link to="settings" >Settings</Link>
       </SheetFooter> 

      </SheetContent>

    </Sheet>
  )

}



export default AdminPage;

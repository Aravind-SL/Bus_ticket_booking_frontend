import { Button } from "@/components/ui/button";
import {Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import {MapPinIcon} from "lucide-react";
import {Link, Outlet} from "react-router-dom";

export {StationPage} from './Stations';
export {RoutePage} from './RoutePage';
export {BusPage} from './BusPage';
export {UsersPage} from './Users';
export {BookingPage} from './BookingPage';

export {StationDetailPage} from './StationDetail';
export {RoutesDetailPage} from './RoutesDetail';
export {BusDetailPage} from './BusDetailPage';
export {AdminHome} from './AdminHome';
export {BookingDetailPage} from './BookingDetail';


const AdminPage = () => {
  // Check for admin role.
  return (
    <main className="h-screen p-4">
      <AdminNav />
      <Outlet />
    </main>
  )

}

export  const links = [
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
const AdminNav = () => {


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


      </SheetContent>

    </Sheet>
  )

}



export default AdminPage;

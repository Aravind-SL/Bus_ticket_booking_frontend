import EntityPage from "./EntityPage";
import { useBookings } from "@/stores";
export const UsersPage  = () => {
  return (
    <EntityPage 
      pageTitle="Bookings"
      useData={useBookings}
      id={(b) => b.id}
      label={(u) => u.id}
    />
  );
}



import EntityPage from "./EntityPage";
import { useUsers } from "@/stores";
export const UsersPage  = () => {
  return (
    <EntityPage 
      pageTitle="Buses"
      useData={useUsers}
      id={(u) => u.username}
      label={(u) => u.username}
    />
  );
}



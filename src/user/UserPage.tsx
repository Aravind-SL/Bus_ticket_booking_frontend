import { Outlet } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {useAuth} from "@/auth/AuthProvider";

/**
* A page for viewing and managing authenticated information.
*/
const UserPage = () => {

  return (
    <div className="container w-full py-8">
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-start py-14 gap-3">

        <Avatar className="w-16 h-16 border-2 border-primary">
          <AvatarImage src="https://via.placeholder.com/128x128" />
        </Avatar>

        <span className="text-center md:text-left">
          <p className="text-muted-foreground">something@mail.ckhjm</p>
        </span>
      </div>



      <Outlet />
    </div>
  )
}


export default UserPage;

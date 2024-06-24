import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import axios from "axios";
import {useEffect} from "react";
<<<<<<< HEAD
import {useAuth} from "@/auth/AuthProvider";
=======
>>>>>>> 2c0230d (files are updated)


type Loader = (prop: any) => Promise<any>;
export const loader: Loader = async ({ request }) => {
  return {};
}


/**
* A page for viewing and managing authenticated information.
*/
const UserPage = () => {
  const [username, setUsername] = useState('');
<<<<<<< HEAD
  const {token} = useAuth();

  useEffect(() => {

    fetch("http://localhost:8080/api/v1/users/me", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

      

   axios.get("http://localhost:8080/api/v1/users/me");
=======

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/users/me")
      .then((d) => {
        setUsername(d.data.username);
      });
>>>>>>> 2c0230d (files are updated)
  }, []);

  return (
    <div className="container w-full py-8">
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-start py-14 gap-3">

        <Avatar className="w-16 h-16 border-2 border-primary">
          <AvatarImage src="https://via.placeholder.com/128x128" />
          <AvatarFallback>@{username}</AvatarFallback>
        </Avatar>

        <span className="text-center md:text-left">
          <p className="text-lg text-foreground">{username}</p>
          <p className="text-muted-foreground">something@mail.ckhjm</p>
        </span>
      </div>



      <Outlet />
    </div>
  )
}


export default UserPage;

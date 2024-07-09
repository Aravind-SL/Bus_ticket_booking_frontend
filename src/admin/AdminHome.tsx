import {Link} from 'react-router-dom';
import { useFetch } from "@/utils/hooks";
import { links } from ".";

export const AdminHome = () => {

  const {isLoading, data:user, error } = useFetch<User>("api/v1/users/me");
  return (<section className="container py-8">

    {
      isLoading ? <p>Loading</p> :
        error ? <span>{error.message}</span> :
          <h1>Hello {user?.username} </h1>
    }




    <div className='w-full mt-8 grid grid-cols-2 gap-8'>
      
      {links.map( (li,x)  => (
        <Link to={li.to} key={x}>
          <div className='py-12 rounded bg-background px-14 hover:bg-muted transition'>
            {li.label}
          </div>
        </Link>
      ) )}

    </div>



  </section>);


}

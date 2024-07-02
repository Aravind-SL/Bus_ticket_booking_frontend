import {
    Menubar,
    MenubarTrigger,
    MenubarMenu,
  } from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
import { useState } from 'react'; 


  
export default function NavBar() {
  const [Logged] = useState(false);
  return(
      <Menubar className='w-full h-fit flex items-center font-medium '>
        <MenubarMenu>
            <MenubarTrigger className='flex-auto md:flex-auto' ><div className="sm:flex-auto sm:items-start sm:justify-between">
              <a href="/home" className="flex items-start mb-2 sm:mb-0 space-x-3 rtl:space-x-reverse">
                  <img className='w-14 h-14 md:w-12 mb-2 ' src="https://img.freepik.com/premium-vector/logo-bus-icon-school-bus-vector-isolated-transport-bus-silhouette-design-black-bus_653669-3055.jpg " alt="BusKaro logo" />
                  <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">BusKaro</span>
              </a>
            </div>
            </MenubarTrigger> 
            
            <MenubarTrigger>Home</MenubarTrigger>
            <MenubarTrigger>Browse</MenubarTrigger>
            <MenubarTrigger>Contact</MenubarTrigger>
            {
              Logged && <MenubarTrigger>Profile</MenubarTrigger>
            
            }
            <MenubarTrigger><Button>Log In / Sign Up</Button></MenubarTrigger>
        </MenubarMenu>
      </Menubar>
  );
}


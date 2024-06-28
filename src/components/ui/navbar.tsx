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
      <Menubar className='w-full h-750 flex items-center text-lg px-4 max-sm:flex max-sm:gap-0 bg-[#f5f6f7]'>
        <MenubarMenu>
            <MenubarTrigger className='flex-auto md:flex-auto '>
              <div className="sm:flex-auto sm:items-start sm:justify-between ">
                <a href="/home" className="flex items-start sm:mb-0 space-x-1.5 max-sm:space-x-1 rtl:space-x-reverse">
                    <img className='w-20 h-20 max-sm:w-16 bg-inherit' src="src\assets\Bus_Logo.png " alt="NexTrip logo" />
                    <span className="self-center text-2xl font-bold max-sm:text-lg  dark:text-white">NexTrip</span>
                </a>
              </div>
            </MenubarTrigger> 
            
            <MenubarTrigger className='md:text-base max-sm:text-sm '>Home</MenubarTrigger>
            <MenubarTrigger className='md:text-base max-sm:text-sm '>Browse</MenubarTrigger>
            <MenubarTrigger className='md:text-base max-sm:text-sm '>Contact</MenubarTrigger>
            {
              Logged && <MenubarTrigger className='text-base'>Profile</MenubarTrigger>
            
            }
            <MenubarTrigger className='text-base sm:text-sm '><Button>Log In / Sign Up</Button></MenubarTrigger>
        </MenubarMenu>
      </Menubar>
  );
}


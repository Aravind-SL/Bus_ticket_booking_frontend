import {
    Menubar,
    MenubarTrigger,
    MenubarMenu,
  } from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
import { useState } from 'react'; 
import { redirect } from 'react-router-dom';

  
export default function Navbar() {
  const [Logged] = useState(false);
    return (
      <Menubar className='w-full h-250 flex items-center py-2 '>
        <MenubarMenu>
            <MenubarTrigger className='flex-auto md:flex-auto' >logo</MenubarTrigger>
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


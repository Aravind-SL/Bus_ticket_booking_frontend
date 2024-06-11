import {
    Menubar,
    MenubarTrigger,
    MenubarMenu,
  } from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
  
export default function Navbar() {
    return (
      <Menubar className='h-200'>
        <MenubarMenu>
            <MenubarTrigger>logo</MenubarTrigger>
            <MenubarTrigger>Home</MenubarTrigger>
            <MenubarTrigger>Browse</MenubarTrigger>
            <MenubarTrigger>Contact</MenubarTrigger>
            <MenubarTrigger><Button >Log In / Sign Up</Button></MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    );
}
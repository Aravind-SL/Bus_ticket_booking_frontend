import {
    Menubar,
    MenubarTrigger,
    MenubarItem,
    MenubarMenu,
  } from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
  
export default function Navbar() {
    return (
      <Menubar>
        <MenubarMenu>
            <MenubarTrigger>Home</MenubarTrigger>
            <MenubarTrigger>Browse</MenubarTrigger>
            <MenubarTrigger>Contact</MenubarTrigger>
            <MenubarTrigger><Button >Log In / Sign Up</Button></MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    );
}
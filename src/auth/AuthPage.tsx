import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from './LoginForm';
import SignUpForm from  './SignUpForm';

/**
* The entrypoint for the auth page.
*/
export default function Auth() {
    return (
        <div className="w-full h-screen container flex items-center justify-center lg:justify-start">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Log In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <LoginForm />
                </TabsContent>
                <TabsContent value="signup">
                    <SignUpForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}

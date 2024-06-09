import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from './LoginForm';
import SignUpForm from  './SignUpForm';

/**
* The entrypoint for the auth page.
*/
export default function Auth() {
    return (
        <div className="w-full h-screen flex md:px-32 items-center justify-center md:justify-start bg-[url('https://via.placeholder.com/1920x1080')] bg-top-right bg-cover">
            <div className="h-full md:px-6  lg:px-12 flex items-center bg-background/50 backdrop-blur w-full md:w-auto lg:border-x-2 border-secondary">
                <Tabs defaultValue="login" className="w-[400px] mx-auto">
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
        </div>
    )
}

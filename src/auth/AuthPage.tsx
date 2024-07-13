import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from './LoginForm';
import SignUpForm from  './SignUpForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

/**
* The entrypoint for the auth page.
*/
export default function Auth() {
    const {token} = useAuth();
    if (token) {
        return (<Navigate to="/home" />);
    }
    return (
        <div className="w-full h-screen flex md:px-32 items-center justify-center md:justify-end bg-[url('/bus.jpg')] bg-top-right bg-cover">
            <div className="flex items-center w-full h-full md:px-6 lg:px-12 bg-background/30 backdrop-blur-sm md:w-auto lg:border-x-2 border-secondary/40">
                <Tabs defaultValue="login" className="w-[400px] mx-auto">
                    <TabsList className="w-full grid grid-cols-2">
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

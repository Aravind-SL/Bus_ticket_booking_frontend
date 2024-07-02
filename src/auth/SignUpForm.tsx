import {Card, CardTitle, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Form, FormItem, FormLabel, FormField, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { AuthResponse } from './LoginForm';
import axios, { AxiosResponse } from 'axios';
import { API_URL } from '@/consts';
import { useAuth } from './AuthProvider';

const LoginFormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Password must have atleast 8 characters"
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must have atleast 8 characters"
    }),
}).refine((data) => data.confirmPassword === data.password, {
    message: "Password aren't matching",
    path: ["confirmPassword"]
})

/** Login form component */
export default function LoginForm() {

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    });
    const {setToken} = useAuth();

    async function onSubmit(data: z.infer<typeof LoginFormSchema>){
        try {
            const res: AxiosResponse<AuthResponse> = await axios.post(API_URL + "/api/v1/auth/register", data);

            setToken(res.data.token);

            toast({
                title: "Logged In",
                description: (
                    <p className="text-green-400">Successfully Logged In!</p>
                )
            })
        } catch (err: any) {
            toast({
                title: "Failed to Log In",
                description: (
                    <p className="text-red-400">{err.data}</p>
                )
            });
        }
    }

    return (
        <Card className="text-foreground">
            <CardHeader>
                <CardTitle className="mb-2 text-center">Register</CardTitle>
                <CardDescription className="text-center">Create a new account for yourself.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5 ">
                        <FormField
                            name="firstName"
                            control={form.control}
                            render = {({field}) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input  placeholder="Enter your first name" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="lastName"
                            control={form.control}
                            render = {({field}) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input  placeholder="Enter your last name" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render = {({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input  placeholder="Email" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render = {({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
              <Input type="password" placeholder="Password" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="confirmPassword"
                            control={form.control}
                            render = {({field}) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter the password again" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                            {form.formState.isSubmitting && (<ReloadIcon className="w-4 h-4 mr-2 animate-spin"/>)}
                            Sign Up
                        </Button>
                    </form>
                </Form>

            </CardContent>
        </Card>
    )
}

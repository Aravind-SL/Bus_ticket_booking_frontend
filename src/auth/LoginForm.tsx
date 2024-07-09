import {Card, CardTitle, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Form, FormItem, FormLabel, FormField, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { API_URL } from '@/consts';
import axios, {AxiosResponse} from 'axios';
import { useAuth } from './AuthProvider';

const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string()
})


export interface AuthResponse {
    token: string
}

/** Login form component */
export default function LoginForm() {
    const {setToken} = useAuth();


    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    async function onSubmit(data: z.infer<typeof LoginFormSchema>){

        try {
            const res: AxiosResponse<AuthResponse> = await axios.post(API_URL + "/api/v1/auth/authenticate", data);

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
                    <p className="text-red-400">{err.message}</p>
                )
            });
        }

    }

    return (
        <Card className="text-foreground">
            <CardHeader>
                <CardTitle className="mb-2 text-center">Log In</CardTitle>
                <CardDescription className="text-center">Log in with your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5 ">
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
                        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                            {form.formState.isSubmitting && (<ReloadIcon className="w-4 h-4 mr-2 animate-spin"/>)}
                            Log In
                        </Button>
                    </form>
                </Form>

            </CardContent>
        </Card>
    )
}

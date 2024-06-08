import {Card, CardTitle, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Form, FormItem, FormLabel, FormField, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';


const LoginFormSchema = z.object({
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

    async function onSubmit(data: z.infer<typeof LoginFormSchema>){

        // Simulating Login
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast({
            title: "Submitting",
            description: (
                <pre className="p-4">
                    <code >
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            )
        })
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
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter the password again" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                            {form.formState.isSubmitting && (<ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>)}
                            Sign Up
                        </Button>
                    </form>
                </Form>

            </CardContent>
        </Card>
    )
}

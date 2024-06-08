import {Card, CardTitle, CardHeader, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Form, FormItem, FormLabel, FormField, FormControl, FormMessage } from '../ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '../ui/use-toast';
import { Button } from '../ui/button';


const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

/** Login form component */
export default function LoginForm() {

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    function onSubmit(data: z.infer<typeof LoginFormSchema>){
        toast({
            title: "Submitting",
            description: (
                <p>Submitting</p>
            )
        })
    }

    return (
        <Card className="text-foreground">
            <CardHeader>
                <CardTitle className="mb-2 text-center">Log In</CardTitle>
                <CardDescription >Login</CardDescription>
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
                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </Form>

            </CardContent>
        </Card>
    )
}

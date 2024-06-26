import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ReloadIcon} from "@radix-ui/react-icons";

const StationFormSchema = z.object({
  stationName: z.string().min(1),
  state: z.string().min(1)
});

interface StationFormProps {
  station?: Station
  onSubmit: (data: z.infer<typeof StationFormSchema>) => Promise<void>
}

export default ({station, onSubmit}: StationFormProps) => {

  const form = useForm<z.infer<typeof StationFormSchema>>({
      resolver: zodResolver(StationFormSchema),
      defaultValues: {
        stationName: station?.stationName || "",
        state: station?.state || "",
      }
  });

  return (
        <Form {...form}>
        <DialogClose asChild>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-5'>
            <FormField 
              name="stationName"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Station Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Station Name"  {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="state"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter State"  {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full mt-5">

              {form.formState.isSubmitting && (<ReloadIcon className="w-4 h-4 mr-2 animate-spin"/>)}
              <span>{station ? "Edit" : "Add"}</span> 
            </Button>
          </form>
        </DialogClose>
        </Form>
  );

}

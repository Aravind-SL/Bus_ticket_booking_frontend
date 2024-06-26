import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from '@/components/ui/use-toast';
import { useStations } from "@/stores";
import {ReloadIcon} from "@radix-ui/react-icons";

const StationFormSchema = z.object({
  stationName: z.string().min(1),
  state: z.string().min(1)
});

interface StationFormProps {
  station?: Station
}

export default ({station}: StationFormProps) => {

  const addStation = useStations(state => state.add);
  const form = useForm<z.infer<typeof StationFormSchema>>({
      resolver: zodResolver(StationFormSchema),
      defaultValues: {
        stationName: station?.stationName || "",
        state: station?.state || "",
      }
  });

  const onSubmit = async (data: z.infer<typeof StationFormSchema>) => {
    try {
      await addStation(data);
      toast({
        title: "Added Station " + data.stationName,
        description: (
          <p>The station {data.stationName} is added Successfully </p>
        )
      });

    } catch (e) {
      toast({
        title: "Failed to add Station " + data.stationName,
        description: (
          <p>{e.data ? e.data : e.message}</p>
        )
      });

    }
  }

        

  return (
        <Form {...form}>
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
            <DialogClose asChild>
              <Button type="submit" disabled={form.formState.isSubmitting} className="w-full mt-5">

                {form.formState.isSubmitting && (<ReloadIcon className="w-4 h-4 mr-2 animate-spin"/>)}
                <span>{station ? "Edit" : "Add"}</span> 
              </Button>
          </DialogClose>
          </form>
        </Form>
  );

}

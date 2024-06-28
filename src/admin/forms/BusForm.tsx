import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import SelectBoxSearch from "@/components/SelectBoxSearch";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from '@/components/ui/use-toast';
import {useStations, useBuses, useRoutes } from "@/stores";
import {ReloadIcon} from "@radix-ui/react-icons";
import {useState, useEffect} from "react";
import {MapIcon} from "lucide-react";

const BusFormSchema = z.object({
  busNumber: z.coerce.number(),
  routeId: z.coerce.number(),
  departureTime: z.string().transform((s) => s + ":00").pipe(z.string().time()),
  arrivalTime: z.string().transform((s) => s + ":00").pipe(z.string().time()),
  totalSeats: z.coerce.number(),
  pricePerUnitDistance: z.coerce.number()
});

interface BusFormProps {
  bus?: Bus
}

export default ({bus}: BusFormProps) => {

  const stationName = useStations(state => (id: EntityID) => state.items.find((s) => s.stationId === id)?.stationName);
  const addBus = useBuses(state => state.add);
  const editBus = useBuses(state => state.edit);
  const routes = useRoutes(state => state.items);
  const fetchNow = useRoutes((state) => state.fetchAll);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!routes) {
      setLoading(true)
      fetchNow().finally(() => setLoading(false));
    }
  }, []);

  const form = useForm<z.infer<typeof BusFormSchema >>({
      resolver: zodResolver(BusFormSchema),
      defaultValues: bus ? {
        ...bus,
        routeId: bus.route.routeId,
        totalSeats: bus.seats.length,
      } : {}
  });

  const onSubmit = async (data: z.infer<typeof BusFormSchema >) => {
    try {
      if (!bus) {
        await addBus(data);
        toast({
          title: "Added New Bus ",
        });
      } else {
        await editBus(bus.busId, data);
        toast({
          title: "Changes Saved Station",
        });
      }

    } catch (e) {
      toast({
        title: "Failed to process" + data.busId,
        description: (
          <p>{e.data ? e.data : e.message}</p>
        )
      });

    }
  }

  return isLoading ? <p>Loading...</p>: (
      <DialogClose asChild>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-5'>
            <FormField 
              name="busNumber"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Bus Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Bus Number" type='number'  {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="totalSeats"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Seats</FormLabel>
                  <FormControl>
                    <Input disabled={bus!==undefined} placeholder="Enter number of seats" type='number'  {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="routeId"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Route</FormLabel>
                  <FormControl>
                      <SelectBoxSearch
                        label='Select Route'
                        items={routes || []}
                        valueTransform={(rt) =>`${stationName(rt.fromStation)} - ${stationName(rt.toStation)}`}
                        searchPlaceHolder='Search for Routes'
                        emptyMessage='No Routes found'
                        id={(rt) => rt.routeId.toString()}
                        icon={
                          <MapIcon className='w-5 h-5' />
                        }
                        getValueCallback={(val) => {
                          form.setValue(field.name, val.routeId);
                        }}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="departureTime"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Departure Time</FormLabel>
                  <FormControl>
                    <Input type="time"  {...field}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="arrivalTime"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Destination Arrival Time</FormLabel>
                  <FormControl>
                    <Input type="time"  {...field}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="pricePerUnitDistance"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter price" type='number'  {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full mt-5">
              {form.formState.isSubmitting && (<ReloadIcon className="w-4 h-4 mr-2 animate-spin"/>)}
              <span>{bus ? "Edit" : "Add"}</span> 
            </Button>
          </form>
        </Form>
      </DialogClose>
  );

}

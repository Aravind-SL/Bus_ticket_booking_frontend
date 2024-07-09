import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {toast} from '@/components/ui/use-toast';
import {useRoutes, useStations} from '@/stores';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {ReloadIcon} from '@radix-ui/react-icons';
import {useState, useEffect} from 'react';
import {MapPin} from 'lucide-react';
import SelectBoxSearch from '@/components/SelectBoxSearch';
import {DialogClose} from '@/components/ui/dialog';

const RouteFormSchema = z.object({
  fromStation: z.coerce.number(),
  toStation: z.coerce.number(),
  distance: z.coerce.number(),
});


interface RouteFormProps {route?: Route};
export default ({route}: RouteFormProps) => {

  const addRoute = useRoutes(state => state.add);

  const [isLoading, setLoading] = useState(false);
  const stations = useStations((state) => state.items);
  const fetchNow = useStations((state) => state.fetchAll);

  useEffect(() => {
    if (!stations) {
      setLoading(true)
      fetchNow().finally(() => setLoading(false));
    }
  }, []);

  const [startList, setStartList] = useState<Station[]>([]);
  const [destinationList, setDestinationList] = useState<Station[]>([]);
  const [start, setStart] = useState<Station>();
  const [destination, setDestination] = useState<Station>();

  useEffect(() => {


    if (start && stations)
      setDestinationList(stations.filter((s) => s !== start));
    else if (stations)
      setDestinationList(stations);

    if (destination && stations)
      setStartList(stations.filter((s) => s !== destination));
    else if (stations)
      setStartList(stations);

  }, [start, destination, stations]);
  


  const form = useForm<z.infer<typeof RouteFormSchema>>({
    resolver: zodResolver(RouteFormSchema),
    defaultValues: {
    }
  });


  const onSubmit = async (data: z.infer<typeof RouteFormSchema>) => {
    try {
      await addRoute(data);
      toast({
        title: "Added Route",
        description: (
          <p>New Route has been added</p>
        )
      });
    } catch (e) {
      toast({
        title: "Failed to add Route ",
        description: (
          <p>{e.data ? e.data : e.message}</p>
        )
      });
    }
  }

  return isLoading ? <p>Loading...</p> : (
    <DialogClose asChild>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-5'>
        <FormField
          name="fromStation"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>Starting Station</FormLabel>
              <FormControl>
                <SelectBoxSearch
                  label='Select Start'
                  items={startList}
                  valueTransform={(st) => st.stationName}
                  searchPlaceHolder='Search for Station'
                  emptyMessage='No stations found'
                  id={(st) => st.stationId.toString()}
                  icon={
                    <MapPin className='w-5 h-5' />
                  }
                  getValueCallback={(val) => {
                    setStart(val);
                    form.setValue(field.name, val.stationId);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="toStation"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>Destination Station</FormLabel>
              <FormControl>
                <SelectBoxSearch<Station>
                  label='Select Destination'
                  items={destinationList}
                  valueTransform={(st) => st.stationName}
                  searchPlaceHolder='Search for Station'
                  emptyMessage='No stations found'
                  icon={
                    <MapPin className='w-5 h-5' />
                  }
                  id={(st) => st.stationId.toString()}
                  getValueCallback={(val) => {
                    setDestination(val);
                    form.setValue(field.name, val.stationId);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="distance"
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>Distance</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button type="submit" disabled={form.formState.isSubmitting} className="w-full mt-5">

            {form.formState.isSubmitting && (<ReloadIcon className="w-4 h-4 mr-2 animate-spin" />)}
            <span>{route ? "Edit" : "Add"}</span>
          </Button>
      </form>
    </Form>
    </DialogClose>
  );

  /*
    *
        <DialogClose asChild>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-5'>
            <FormField 
              name="fromStationId"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Starting Station</FormLabel>
                  <FormControl>
                    <SelectBoxSearch
                      label='Select Start'
                      items={startList}
                      valueTransform={(st) => st.stationName}
                      searchPlaceHolder='Search for Station'
                      emptyMessage='No stations found'
                      id={(st) => st.stationId.toString()}
                      icon={
                        <MapPin className='w-5 h-5' />
                      }
                      getValueCallback={setStart}
                    />
                    <Input hidden  {...field}  value={start?.stationId}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="toStationId"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Destination Station</FormLabel>
                  <FormControl>
                    <SelectBoxSearch<Station>
                      label='Select Destination'
                      items={destinationList}
                      valueTransform={(st) => st.stationName}
                      searchPlaceHolder='Search for Station'
                      emptyMessage='No stations found'
                      icon={
                        <MapPin className='w-5 h-5' />
                      }
                      id={(st) => st.stationId.toString()}
                      getValueCallback={setDestination}
                    />
                    <Input hidden  {...field}  value={destination?.stationId}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="distance"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Distance</FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full mt-5">

              {form.formState.isSubmitting && (<ReloadIcon className="w-4 h-4 mr-2 animate-spin"/>)}
              <span>{route ? "Edit" : "Add"}</span> 
            </Button>
          </form>
        </DialogClose>
    */

}
